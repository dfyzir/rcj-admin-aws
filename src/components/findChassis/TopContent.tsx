import { SetStateAction, useCallback, useEffect } from "react";
import { TrailerRCJ } from "@/API";

import { Input } from "@heroui/react";
import { SearchIcon } from "../icons/SearchIcon";
import ExpireSoonButton from "../buttons/ExpireSoonButton";
import ExpiredButton from "../buttons/ExpiredButton";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useRouter } from "next/router";
import RowsPerPageDropdown from "../common/RowsPerPageDropdown";
import {
  tableSearchInputClassNames,
  tableStatsRowClassName,
  tableStatsTextClassName,
} from "@/lib/tableShell";

/*TopContent Component
 This component represents the top section of a table, including search functionality,
 filter buttons for expiring trailers, adding a new trailer button.
*/

type TopContentProps = {
  filterValue: string;
  trailers: TrailerRCJ[];
  setPage: (value: SetStateAction<number>) => void;
  setFilterValue: (value: SetStateAction<string>) => void;
  setRowsPerPage: (value: SetStateAction<number>) => void;
  rowsPerPage: number;
};

const TopContent = ({
  trailers,
  filterValue,
  setPage,
  setFilterValue,
  setRowsPerPage,
  rowsPerPage,
}: TopContentProps) => {
  const router = useRouter();
  const { replace } = useRouter();
  const { search } = router.query;

  useEffect(() => {
    search != null ? setFilterValue(search as string) : "";
  }, [search, setFilterValue]);

  const screenWidth = useScreenWidth();

  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
        replace(`/?search=${value.replace(/\s/g, "")}`);
      } else {
        setFilterValue("");
        replace(`/`);
      }
    },
    [replace, setFilterValue, setPage]
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
    replace("/");
  }, [replace, setFilterValue, setPage]);

  return (
    <div className="mt-3 flex w-full flex-col gap-3 sm:mt-4 sm:gap-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="md:w-1/2">
          <Input
            size="sm"
            isClearable
            placeholder="Search by chassis, VIN, or plate..."
            startContent={<SearchIcon />}
            classNames={tableSearchInputClassNames}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div
            className={`flex ${
              screenWidth < 370 ? "flex-col" : "flex-row"
            } gap-3`}>
            <ExpireSoonButton
              trailers={trailers}
              setFilterValue={setFilterValue}
              setPage={setPage}
            />
            <ExpiredButton
              trailers={trailers}
              setFilterValue={setFilterValue}
              setPage={setPage}
            />
          </div>
          {/* <div className="flex  ">
            <AddTrailerButtonAWS />
          </div> */}
        </div>
      </div>

      <div className={tableStatsRowClassName}>
        <span className={tableStatsTextClassName}>
          Total {trailers?.length} trailers
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
