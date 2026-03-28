import { SetStateAction, useCallback } from "react";
import { Input } from "@heroui/react";
import { SearchIcon } from "../icons/SearchIcon";
import RowsPerPageDropdown from "../common/RowsPerPageDropdown";
import {
  tableSearchInputClassNames,
  tableStatsRowClassName,
  tableStatsTextClassName,
} from "@/lib/tableShell";

// If you have a shared FileMetadata type, import it; otherwise, define it here:
export type FileMetadata = {
  id: string;
  key: string;
  lastModified?: Date;
  metadata?: { [key: string]: string };
};

type TopContentProps = {
  filterValue: string;
  files: FileMetadata[];
  setPage: (value: SetStateAction<number>) => void;
  setFilterValue: (value: SetStateAction<string>) => void;
  setRowsPerPage: (value: SetStateAction<number>) => void;
  rowsPerPage: number;
};

const TopContent = ({
  files,
  filterValue,
  setPage,
  setFilterValue,
  setRowsPerPage,
  rowsPerPage,
}: TopContentProps) => {
  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    [setFilterValue, setPage]
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, [setFilterValue, setPage]);

  return (
    <div className="flex flex-col gap-4 mt-5 w-full">
      <div className="flex flex-col md:flex-row justify-between gap-7 text-large">
        <div className="mt-auto md:w-1/2">
          <Input
            size="sm"
            isClearable
            placeholder="Search file"
            startContent={<SearchIcon />}
            classNames={tableSearchInputClassNames}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        </div>
        {/* Optionally, add filter buttons here if needed */}
      </div>
      <div className={tableStatsRowClassName}>
        <span className={tableStatsTextClassName}>
          Total {files?.length} files
        </span>
        <RowsPerPageDropdown
          value={rowsPerPage}
          onChange={(value) => {
            setRowsPerPage(value);
            setPage(1);
          }}
          labelClassName={tableStatsTextClassName}
        />
      </div>
    </div>
  );
};

export default TopContent;
