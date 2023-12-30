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
import ContainerButton from "./buttons/ContainerButton";
import useTwoDaysDifference from "@/hooks/useCheckContainerDate";
import ExpiredContainerButton from "./buttons/ExpiredContainerButton";
import LocationButton from "./buttons/LocationsSelectButton";
import useScreenWidth from "@/hooks/useScreenWidth";

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
  const { isContainerExpired } = useTwoDaysDifference();

  const screenWidth = useScreenWidth();

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
      <div className="flex flex-col lg:flex-row justify-between gap-7 text-large ">
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
        <div className="flex flex-col lg:flex-row gap-7">
          <div
            className={`flex ${
              screenWidth < 370 ? "flex-col" : "flex-row"
            } gap-3`}>
            <ContainerButton
              locations={locations}
              setFilterValue={setFilterValue}
              setPage={setPage}
            />
            <ExpiredContainerButton
              locations={locations}
              setFilterValue={setFilterValue}
              setPage={setPage}
            />
          </div>
          <div
            className={`flex ${
              screenWidth < 370 ? "flex-col" : "flex-row"
            } gap-3`}>
            <LocationButton
              locations={locations}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              locationOptions={locationOptions}
            />
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
