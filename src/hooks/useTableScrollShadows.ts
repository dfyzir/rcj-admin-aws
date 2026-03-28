import { DependencyList, useCallback, useEffect, useRef, useState } from "react";

export function useTableScrollShadows(
  _debugLabel: string,
  recalcDeps: DependencyList = []
) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const recalcSignature = recalcDeps.map((dep) => String(dep)).join("|");

  const updateShadows = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;

    const { scrollTop, scrollHeight, clientHeight } = node;
    const canScroll = scrollHeight > clientHeight + 1;
    const nextShowTopShadow = canScroll && scrollTop > 0;
    const nextShowBottomShadow =
      canScroll && scrollTop + clientHeight < scrollHeight - 1;

    setShowTopShadow(nextShowTopShadow);
    setShowBottomShadow(nextShowBottomShadow);
  }, [setShowTopShadow, setShowBottomShadow]);

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
  }, [updateShadows, recalcSignature]);

  return { scrollRef, showTopShadow, showBottomShadow, updateShadows };
}
