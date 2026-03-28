import React from "react";
import { useTheme } from "@/context/themeContext";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

type ThemeToggleProps = {
  compact?: boolean;
};

export default function ThemeToggle({
  compact = false,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group relative inline-flex items-center rounded-full border border-slate-200/70 bg-white/85 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.45)] transition-all hover:border-[#316BAD]/28 hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.08)_0%,rgba(0,141,193,0.14)_50%,rgba(49,107,173,0.08)_100%)] hover:shadow-[0_18px_34px_-22px_rgba(0,141,193,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_18px_40px_-24px_rgba(2,6,23,0.95)] dark:hover:border-[#316BAD]/34 dark:hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.22)_50%,rgba(49,107,173,0.14)_100%)] dark:hover:shadow-[0_18px_36px_-22px_rgba(0,141,193,0.28)] dark:focus-visible:ring-sky-300/35 dark:focus-visible:ring-offset-slate-950 ${
        compact ? "h-9 w-[68px] px-1.5" : "h-10 w-[74px] px-2"
      }`}>
      <span className="relative z-10 flex w-full items-center justify-between">
        <span
          className={`relative flex items-center justify-center transition-all duration-300 ${
            compact ? "h-6 w-6" : "h-7 w-7"
          } ${
            isDark
              ? "scale-95 text-slate-400/75 dark:text-slate-500/80"
              : "scale-105 text-amber-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.48)]"
          }`}>
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
              isDark
                ? "scale-75 bg-amber-300/0 opacity-0"
                : "scale-100 bg-amber-300/30 opacity-100"
            }`}
          />
          <SunIcon className={compact ? "h-4 w-4" : "h-5 w-5"} />
        </span>
        <span
          className={`relative flex items-center justify-center transition-all duration-300 ${
            compact ? "h-6 w-6" : "h-7 w-7"
          } ${
            isDark
              ? "scale-105 text-indigo-50 drop-shadow-[0_0_10px_rgba(165,180,252,0.26)]"
              : "scale-95 text-slate-400/80"
          }`}>
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
              isDark
                ? "scale-100 bg-indigo-300/20 opacity-100"
                : "scale-75 bg-slate-200/0 opacity-0"
            }`}
          />
          <MoonIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </span>
      </span>
    </button>
  );
}
