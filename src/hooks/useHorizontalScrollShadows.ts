import { useCallback, useEffect, useRef, useState } from "react";

export function useHorizontalScrollShadows(recalcDeps: unknown[] = []) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const updateShadows = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;

    const { scrollLeft, scrollWidth, clientWidth } = node;
    const canScroll = scrollWidth > clientWidth + 1;

    setShowLeftShadow(canScroll && scrollLeft > 1);
    setShowRightShadow(canScroll && scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    updateShadows();

    node.addEventListener("scroll", updateShadows, { passive: true });
    window.addEventListener("resize", updateShadows);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateShadows)
        : null;

    resizeObserver?.observe(node);

    return () => {
      node.removeEventListener("scroll", updateShadows);
      window.removeEventListener("resize", updateShadows);
      resizeObserver?.disconnect();
    };
  }, [updateShadows]);

  useEffect(() => {
    updateShadows();
  }, [recalcDeps, updateShadows]);

  return { scrollRef, showLeftShadow, showRightShadow };
}
