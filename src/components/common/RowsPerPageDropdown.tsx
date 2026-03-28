import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import {
  tableDropdownItemClassNames,
  tableDropdownMenuClassNames,
} from "@/lib/tableShell";

type RowsPerPageDropdownProps = {
  value: number;
  onChange: (value: number) => void;
  labelClassName?: string;
};

const options = [5, 10, 15];

export default function RowsPerPageDropdown({
  value,
  onChange,
  labelClassName = "",
}: RowsPerPageDropdownProps) {
  return (
    <div className={`flex items-center gap-2 whitespace-nowrap ${labelClassName}`}>
      <span>Rows per page:</span>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white px-2.5 py-1 text-inherit shadow-none transition hover:border-[#316BAD]/28 hover:bg-gradient-to-r hover:from-[rgba(49,107,173,0.08)] hover:via-[rgba(0,141,193,0.12)] hover:to-[rgba(49,107,173,0.08)] hover:text-[#255D96] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#316BAD]/32 dark:hover:bg-gradient-to-r dark:hover:from-[rgba(49,107,173,0.14)] dark:hover:via-[rgba(0,141,193,0.18)] dark:hover:to-[rgba(49,107,173,0.14)] dark:hover:text-white">
            <span>{value}</span>
            <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Rows per page"
          variant="light"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[String(value)]}
          onAction={(key) => onChange(Number(key))}
          classNames={tableDropdownMenuClassNames}
          itemClasses={tableDropdownItemClassNames}>
          {options.map((option) => (
            <DropdownItem key={String(option)} textValue={String(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
