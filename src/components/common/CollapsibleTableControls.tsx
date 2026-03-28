import { ReactNode, useEffect, useState } from "react";

const shortViewportQuery = "(max-height: 540px) and (max-width: 1024px)";

type CollapsibleTableControlsProps = {
  children: ReactNode;
};

export default function CollapsibleTableControls({
  children,
}: CollapsibleTableControlsProps) {
  const [isShortViewport, setIsShortViewport] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(shortViewportQuery);
    const updateViewportState = () => {
      setIsShortViewport(mediaQuery.matches);
    };

    updateViewportState();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewportState);
      return () =>
        mediaQuery.removeEventListener("change", updateViewportState);
    }

    mediaQuery.addListener(updateViewportState);
    return () => mediaQuery.removeListener(updateViewportState);
  }, []);

  useEffect(() => {
    setIsExpanded(!isShortViewport);
  }, [isShortViewport]);

  if (!isShortViewport) {
    return <div className="shrink-0">{children}</div>;
  }

  return (
    <div className="shrink-0">
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
        className="mt-2 flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2.5 text-left text-slate-700 shadow-sm transition hover:border-[#316BAD]/28 hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.06)_0%,rgba(0,141,193,0.12)_50%,rgba(49,107,173,0.06)_100%)] hover:text-[#1E5B92] dark:border-white/10 dark:bg-white/[0.05] dark:text-white/85 dark:hover:border-[#316BAD]/32 dark:hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.22)_50%,rgba(49,107,173,0.14)_100%)] dark:hover:text-white">
        <span className="text-xs font-semibold uppercase tracking-[0.14em]">
          Table Controls
        </span>
        <span
          className={`transition-transform duration-200 ease-out ${
            isExpanded ? "rotate-180" : ""
          }`}>
          <ChevronIcon />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out ${
          isExpanded
            ? "mt-2 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}>
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
