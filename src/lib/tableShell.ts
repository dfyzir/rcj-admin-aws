export const tablePageShellClassName =
  "flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden px-1.5 py-3 sm:px-4 sm:py-4 lg:self-stretch lg:py-6";

export const tableScrollFrameClassName =
  "relative isolate min-h-0 min-w-0 max-h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white dark:border-white/10 dark:bg-slate-950 lg:max-h-fit";

export const tableScrollRegionClassName =
  "table-scroll-region h-full min-h-0 overflow-auto overscroll-contain";

export const tableHoverRowClassName =
  "transition-[background-image,box-shadow] duration-150 hover:bg-gradient-to-r hover:from-[rgba(49,107,173,0.06)] hover:via-[rgba(0,141,193,0.18)] hover:to-[rgba(49,107,173,0.06)] hover:shadow-[inset_2px_0_0_rgba(49,107,173,0.34)] dark:hover:from-[rgba(49,107,173,0.08)] dark:hover:via-[rgba(0,141,193,0.20)] dark:hover:to-[rgba(49,107,173,0.08)] dark:hover:shadow-[inset_2px_0_0_rgba(0,141,193,0.32)]";

export const tableStatsRowClassName =
  "flex items-center justify-between gap-3 pb-1 text-sm sm:pb-1.5 sm:text-base lg:text-lg";

export const tableStatsTextClassName =
  "text-slate-600 dark:text-slate-300";

export const tableSearchInputClassNames = {
  base: "w-full",
  mainWrapper: "w-full",
  inputWrapper:
    "h-11 rounded-2xl border border-slate-200/80 bg-slate-100/90 px-3 shadow-none transition before:!hidden after:!hidden data-[hover=true]:bg-slate-100 group-data-[focus=true]:border-[#316BAD]/40 group-data-[focus=true]:bg-gradient-to-r group-data-[focus=true]:from-[rgba(49,107,173,0.04)] group-data-[focus=true]:via-[rgba(0,141,193,0.09)] group-data-[focus=true]:to-[rgba(49,107,173,0.04)] group-data-[focus=true]:shadow-[0_0_0_3px_rgba(0,141,193,0.10)] dark:border-white/10 dark:bg-white/[0.06] dark:data-[hover=true]:bg-white/[0.08] dark:group-data-[focus=true]:border-[#008DC1]/45 dark:group-data-[focus=true]:bg-gradient-to-r dark:group-data-[focus=true]:from-[rgba(49,107,173,0.14)] dark:group-data-[focus=true]:via-[rgba(0,141,193,0.18)] dark:group-data-[focus=true]:to-[rgba(49,107,173,0.14)] dark:group-data-[focus=true]:shadow-[0_0_0_3px_rgba(0,141,193,0.16)]",
  innerWrapper: "gap-2",
  input:
    "bg-transparent text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 dark:text-white dark:placeholder:text-white/35",
  clearButton:
    "text-slate-400 transition hover:text-[#316BAD] dark:text-white/45 dark:hover:text-[#8FCFE8]",
};

export const tablePaginationClassNames = {
  wrapper: "gap-2",
  item:
    "min-w-11 h-11 border border-slate-200/80 !bg-white text-slate-700 shadow-none transition data-[hover=true]:border-[#316BAD]/28 data-[hover=true]:!bg-[linear-gradient(90deg,rgba(49,107,173,0.10)_0%,rgba(0,141,193,0.20)_50%,rgba(49,107,173,0.10)_100%)] data-[hover=true]:text-[#1E5B92] data-[hover=true]:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.10),0_10px_20px_-16px_rgba(0,141,193,0.20)] dark:border-white/10 dark:!bg-white/[0.04] dark:text-white/80 dark:data-[hover=true]:border-[#316BAD]/32 dark:data-[hover=true]:!bg-[linear-gradient(90deg,rgba(49,107,173,0.16)_0%,rgba(0,141,193,0.28)_50%,rgba(49,107,173,0.16)_100%)] dark:data-[hover=true]:text-white dark:data-[hover=true]:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.16),0_12px_22px_-16px_rgba(0,141,193,0.28)]",
  cursor:
    "min-w-11 h-11 bg-gradient-to-r from-[#316BAD] via-[#008DC1] to-[#316BAD] text-white shadow-[0_12px_28px_-16px_rgba(0,141,193,0.45)]",
};

export const tablePaginationButtonClassName =
  "border border-slate-300 bg-white text-slate-800 shadow-sm shadow-slate-200/70 transition hover:border-[#316BAD]/38 hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.24)_50%,rgba(49,107,173,0.14)_100%)] hover:text-[#174E81] hover:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.12),0_12px_24px_-16px_rgba(0,141,193,0.24)] data-[hover=true]:border-[#316BAD]/38 data-[hover=true]:bg-[linear-gradient(90deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.24)_50%,rgba(49,107,173,0.14)_100%)] data-[hover=true]:text-[#174E81] data-[hover=true]:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.12),0_12px_24px_-16px_rgba(0,141,193,0.24)] data-[disabled=true]:border-slate-300 data-[disabled=true]:bg-slate-200 data-[disabled=true]:text-slate-500 data-[disabled=true]:shadow-none data-[disabled=true]:opacity-100 dark:border-white/12 dark:bg-white/[0.07] dark:text-white/90 dark:shadow-black/20 dark:hover:border-[#316BAD]/34 dark:hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.18)_0%,rgba(0,141,193,0.30)_50%,rgba(49,107,173,0.18)_100%)] dark:hover:text-white dark:hover:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.16),0_14px_26px_-16px_rgba(0,141,193,0.30)] dark:data-[hover=true]:border-[#316BAD]/34 dark:data-[hover=true]:bg-[linear-gradient(90deg,rgba(49,107,173,0.18)_0%,rgba(0,141,193,0.30)_50%,rgba(49,107,173,0.18)_100%)] dark:data-[hover=true]:text-white dark:data-[hover=true]:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.16),0_14px_26px_-16px_rgba(0,141,193,0.30)] dark:data-[disabled=true]:border-white/12 dark:data-[disabled=true]:bg-white/[0.05] dark:data-[disabled=true]:text-white/40 dark:data-[disabled=true]:shadow-none dark:data-[disabled=true]:opacity-100";

export const tablePaginationPageButtonBaseClassName =
  "flex h-11 min-w-11 items-center justify-center rounded-xl px-3 text-base font-medium transition";

export const tablePaginationPageButtonClassName =
  "border border-slate-200/80 bg-white text-slate-700 shadow-none hover:border-[#316BAD]/28 hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.10)_0%,rgba(0,141,193,0.20)_50%,rgba(49,107,173,0.10)_100%)] hover:text-[#1E5B92] hover:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.10),0_10px_20px_-16px_rgba(0,141,193,0.20)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80 dark:hover:border-[#316BAD]/32 dark:hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.16)_0%,rgba(0,141,193,0.28)_50%,rgba(49,107,173,0.16)_100%)] dark:hover:text-white dark:hover:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.16),0_12px_22px_-16px_rgba(0,141,193,0.28)]";

export const tablePaginationPageButtonActiveClassName =
  "border-transparent bg-gradient-to-r from-[#316BAD] via-[#008DC1] to-[#316BAD] text-white shadow-[0_12px_28px_-16px_rgba(0,141,193,0.45)]";

export const tableDropdownMenuClassNames = {
  base: "min-w-[11rem]",
  list: "gap-1 p-1",
};

export const tableDropdownItemClassNames = {
  base: "rounded-xl border border-transparent bg-transparent px-3 py-2 text-slate-700 shadow-none transition-all data-[hover=true]:border-[#316BAD]/18 data-[hover=true]:!bg-[linear-gradient(90deg,rgba(49,107,173,0.08)_0%,rgba(0,141,193,0.16)_50%,rgba(49,107,173,0.08)_100%)] data-[hover=true]:text-[#255D96] data-[hover=true]:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.08)] data-[selected=true]:border-[#316BAD]/22 data-[selected=true]:!bg-[linear-gradient(90deg,rgba(49,107,173,0.10)_0%,rgba(0,141,193,0.18)_50%,rgba(49,107,173,0.10)_100%)] data-[selected=true]:text-[#1E5B92] data-[selected=true]:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.10)] dark:text-white/80 dark:data-[hover=true]:border-[#316BAD]/24 dark:data-[hover=true]:!bg-[linear-gradient(90deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.24)_50%,rgba(49,107,173,0.14)_100%)] dark:data-[hover=true]:text-white dark:data-[hover=true]:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.14)] dark:data-[selected=true]:border-[#316BAD]/28 dark:data-[selected=true]:!bg-[linear-gradient(90deg,rgba(49,107,173,0.16)_0%,rgba(0,141,193,0.26)_50%,rgba(49,107,173,0.16)_100%)] dark:data-[selected=true]:text-white dark:data-[selected=true]:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.16)]",
  title: "font-medium text-sm sm:text-[0.95rem]",
  wrapper: "bg-transparent",
  selectedIcon: "text-[#255D96] dark:text-[#8FCFE8]",
};

export const tableFilterTriggerClassName =
  "h-10 rounded-2xl border border-slate-200/80 px-4 text-sm font-semibold shadow-sm shadow-slate-200/70 transition sm:h-11 sm:px-5 sm:text-[0.95rem] dark:border-white/10 dark:shadow-black/20";

export const tableFilterTriggerNeutralClassName =
  "bg-white text-slate-700 hover:border-[#316BAD]/30 hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.08)_0%,rgba(0,141,193,0.16)_50%,rgba(49,107,173,0.08)_100%)] hover:text-[#1E5B92] dark:bg-white/[0.06] dark:text-white/85 dark:hover:border-[#316BAD]/32 dark:hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.24)_50%,rgba(49,107,173,0.14)_100%)] dark:hover:text-white";

export const tableFilterTriggerNeutralActiveClassName =
  "border-[#316BAD]/30 bg-[linear-gradient(90deg,rgba(49,107,173,0.12)_0%,rgba(0,141,193,0.20)_50%,rgba(49,107,173,0.12)_100%)] text-[#1E5B92] shadow-[inset_0_0_0_1px_rgba(49,107,173,0.10),0_12px_24px_-16px_rgba(0,141,193,0.20)] dark:border-[#316BAD]/34 dark:bg-[linear-gradient(90deg,rgba(49,107,173,0.16)_0%,rgba(0,141,193,0.26)_50%,rgba(49,107,173,0.16)_100%)] dark:text-white dark:shadow-[inset_0_0_0_1px_rgba(49,107,173,0.14),0_12px_24px_-16px_rgba(0,141,193,0.28)]";

export const tableHeaderCellClassName =
  "!h-12 !px-6 bg-white text-default-600 border-y border-slate-200/80 dark:bg-slate-950 dark:border-white/10 dark:text-default-400 first:rounded-s-2xl first:border-l last:rounded-e-2xl last:border-r";

export const tableStripedCellClassNames = [
  "group-data-[odd=true]/tr:before:!bg-slate-100/90",
  "dark:group-data-[odd=true]/tr:before:!bg-white/[0.06]",
];

export const tableStripedRowClassName =
  "data-[odd=true]:[&>td]:!bg-slate-100/95 dark:data-[odd=true]:[&>td]:!bg-slate-900/60";

export const tableShellClassNames = {
  base: "min-w-full",
  emptyWrapper: "py-10 text-default-400",
  thead:
    "table-sticky-head sticky top-0 z-20 bg-transparent [&>tr]:first:!rounded-none [&>tr]:first:!shadow-none after:!hidden",
  wrapper: "bg-transparent p-0 shadow-none",
};

export const tableBodyShadowViewportClassName =
  "pointer-events-none absolute inset-x-0 bottom-0 top-12 z-10";

export const tableTopShadowClassName =
  "absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/12 to-transparent dark:from-black/55";

export const tableBottomShadowClassName =
  "absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/12 to-transparent dark:from-black/80";
