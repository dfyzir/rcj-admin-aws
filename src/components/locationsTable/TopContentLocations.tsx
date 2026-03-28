import { SetStateAction, useCallback } from "react";
import { ChassisLocation } from "@/API";
import { Button, Input, Selection } from "@heroui/react";
import AddLocationButtonAWS from "./buttons/AddLocationButtonAWS";
import { SearchIcon } from "../icons/SearchIcon";
import ContainerButton from "./buttons/ContainerButton";
import ExpiredContainerButton from "./buttons/ExpiredContainerButton";
import LocationButton from "./buttons/LocationsSelectButton";
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
  locations: ChassisLocation[];
  setPage: (value: SetStateAction<number>) => void;
  setFilterValue: (value: SetStateAction<string>) => void;
  setRowsPerPage: (value: SetStateAction<number>) => void;
  rowsPerPage: number;
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
  rowsPerPage,
  locationFilter,
  setLocationFilter,
  locationOptions,
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
    [setFilterValue, setPage],
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, [setFilterValue, setPage]);

  const selectedLocationKeys =
    locationFilter === "all"
      ? locationOptions
      : Array.from(locationFilter).map(String);

  const isAllLocationsSelected =
    locationFilter === "all" ||
    selectedLocationKeys.length === locationOptions.length;

  const onLocationChipPress = useCallback(
    (location: string) => {
      const currentSelection = isAllLocationsSelected
        ? [...locationOptions]
        : [...selectedLocationKeys];

      const nextSelection = currentSelection.includes(location)
        ? currentSelection.filter((key) => key !== location)
        : [...currentSelection, location];

      if (nextSelection.length === 0) {
        return;
      }

      setLocationFilter(
        nextSelection.length === locationOptions.length
          ? "all"
          : new Set(nextSelection),
      );
      setPage(1);
    },
    [
      isAllLocationsSelected,
      locationOptions,
      selectedLocationKeys,
      setLocationFilter,
      setPage,
    ],
  );

  const mobileLocationFilters = locationOptions.map((location) => ({
    key: location,
    label: location
      .replace(/ YARD$/i, "")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  }));

  return (
    <div className="mt-3 flex w-full flex-col gap-3 sm:mt-4 sm:gap-4 lg:mt-5">
      <div className="flex flex-col gap-4 text-large xl:flex-row xl:items-center xl:justify-between">
        <div className="mt-auto w-full xl:max-w-xl">
          <Input
            size="sm"
            isClearable
            placeholder="Search by chassis#..."
            startContent={<SearchIcon />}
            classNames={tableSearchInputClassNames}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex min-w-0 w-full flex-wrap items-center justify-start gap-2 sm:gap-3 xl:flex-1 xl:justify-end">
          <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 xl:justify-end max-[370px]:w-full max-[370px]:flex-col">
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
          <div className="hidden md:flex md:flex-wrap md:items-center md:justify-end md:gap-2 lg:gap-3">
            <LocationButton
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              locationOptions={locationOptions}
            />
            <AddLocationButtonAWS />
          </div>
        </div>
      </div>

      <div className="-mx-1 flex flex-wrap gap-2 px-1 md:hidden">
        {mobileLocationFilters.map(({ key, label }) => {
          const isActive = selectedLocationKeys.includes(key);

          return (
            <Button
              key={key}
              size="sm"
              radius="full"
              variant={isActive ? "solid" : "bordered"}
              color={isActive ? "secondary" : "default"}
              className={`min-w-0 px-4 text-sm font-medium ${
                isActive
                  ? "border-transparent text-white"
                  : "border-slate-300/70 bg-transparent text-default-500 dark:border-white/15 dark:text-default-400"
              }`}
              onPress={() => onLocationChipPress(key)}>
              {label}
            </Button>
          );
        })}
      </div>

      <div className={tableStatsRowClassName}>
        <span className={`min-w-0 ${tableStatsTextClassName}`}>
          Total {locations?.length} trailers
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

export default TopContentLocations;
