import { SetStateAction, useCallback, useEffect } from "react";
import { TrailerRCJ } from "@/API";

import { Input } from "@nextui-org/react";
import AddTrailerButtonAWS from "../buttons/AddTrailerButtonAWS";
import { SearchIcon } from "../icons/SearchIcon";
import ExpireSoonButton from "../buttons/ExpireSoonButton";
import ExpiredButton from "../buttons/ExpiredButton";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useRouter } from "next/router";

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
};

const TopContent = ({
  trailers,
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
    <div className="flex flex-col gap-4 mt-5 w-full ">
      <div className="flex flex-col md:flex-row justify-between gap-7 text-large ">
        <div className="mt-auto md:w-1/2">
          <Input
            size="sm"
            isClearable
            className=""
            placeholder="Search by chassis#..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-7">
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

      <div className="flex justify-between items-center">
        <span className="text-default-400 text-large">
          Total {trailers?.length} trailers
        </span>
        <label className="flex items-center text-default-400 text-large">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-large"
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
