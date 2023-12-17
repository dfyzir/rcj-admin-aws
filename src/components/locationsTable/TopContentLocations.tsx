import { SetStateAction, useCallback } from "react";
import { ChassisLocation } from "@/API";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
} from "@nextui-org/react";
import AddLocationButtonAWS from "./buttons/AddLocationButtonAWS";
import { SearchIcon } from "../icons/SearchIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { capitalize } from "@/lib/utils";
import { Container } from "postcss";
import ContainerButton from "./buttons/ContainerButton";

/*TopContent Component
 This component represents the top section of a table, including search functionality,
 filter buttons for expiring trailers, adding a new trailer button.
*/

type TopContentProps = {
  filterValue: string;
  locations: ChassisLocation[];
  setPage: (value: SetStateAction<number>) => void;
  setFilterValue: (value: SetStateAction<string>) => void;
  setRowsPerPage: (value: SetStateAction<number>) => void;
  locationFilter: Selection;
  setLocationFilter: (keys: Selection) => void;
  locationOptions: string[];
};

const TopContentLocations = ({
  locations,
  filterValue,
  setPage,
  setFilterValue,
  setRowsPerPage,
  locationFilter,
  setLocationFilter,
  locationOptions,
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
          <div className="flex flex-row gap-3 w-full justify-start">
            {/* <ExpireSoonButton
              trailers={trailers}
              setFilterValue={setFilterValue}
              setPage={setPage}
            />
            <ExpiredTable
              trailers={trailers}
              setFilterValue={setFilterValue}
              setPage={setPage}
            /> */}
            <ContainerButton
              locations={locations}
              setFilterValue={setFilterValue}
              setPage={setPage}
            />
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  className="text-xl"
                  color="secondary"
                  size="lg"
                  endContent={<ChevronDownIcon className="text-lg" />}>
                  Location
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={locationFilter}
                selectionMode="multiple"
                onSelectionChange={setLocationFilter}>
                {locationOptions.map((location) => (
                  <DropdownItem key={location} className="capitalize">
                    {capitalize(location)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex  ">
            <AddLocationButtonAWS />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-default-400 text-large">
          Total {locations?.length} trailers
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

export default TopContentLocations;
