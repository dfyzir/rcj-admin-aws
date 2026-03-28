import { PointerEvent, useCallback, useRef } from "react";

type DragState = {
  dragging: boolean;
  moved: boolean;
  pointerId: number | null;
  startX: number;
  startScrollLeft: number;
};

const initialDragState: DragState = {
  dragging: false,
  moved: false,
  pointerId: null,
  startX: 0,
  startScrollLeft: 0,
};

export function useDraggableHorizontalScroll() {
  const dragStateRef = useRef<DragState>(initialDragState);
  const suppressClickRef = useRef(false);

  const resetDragState = useCallback(() => {
    dragStateRef.current = initialDragState;
  }, []);

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const node = event.currentTarget;

    if (node.scrollWidth <= node.clientWidth + 1) {
      return;
    }

    dragStateRef.current = {
      dragging: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: node.scrollLeft,
    };

    node.setPointerCapture?.(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;

    if (!state.dragging) {
      return;
    }

    const deltaX = event.clientX - state.startX;

    if (!state.moved && Math.abs(deltaX) > 4) {
      state.moved = true;
    }

    if (!state.moved) {
      return;
    }

    event.preventDefault();
    event.currentTarget.scrollLeft = state.startScrollLeft - deltaX;
  }, []);

  const finishDrag = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const state = dragStateRef.current;

      if (!state.dragging) {
        return;
      }

      if (
        state.pointerId !== null &&
        event.currentTarget.hasPointerCapture?.(state.pointerId)
      ) {
        event.currentTarget.releasePointerCapture(state.pointerId);
      }

      suppressClickRef.current = state.moved;
      resetDragState();
    },
    [resetDragState],
  );

  const onClickCapture = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    suppressClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: finishDrag,
    onPointerCancel: finishDrag,
    onPointerLeave: finishDrag,
    onClickCapture,
  };
}
