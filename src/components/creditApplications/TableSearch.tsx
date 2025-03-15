import { SetStateAction, useCallback } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";

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
};

const TopContent = ({
  files,
  filterValue,
  setPage,
  setFilterValue,
  setRowsPerPage,
}: TopContentProps) => {
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

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
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        </div>
        {/* Optionally, add filter buttons here if needed */}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-large">
          Total {files?.length} files
        </span>
        <label className="flex items-center text-default-400 text-large">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-large ml-2"
            onChange={onRowsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default TopContent;
