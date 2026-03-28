import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { capitalize } from "@/lib/utils";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@heroui/react";
import {
  tableDropdownItemClassNames,
  tableDropdownMenuClassNames,
  tableFilterTriggerClassName,
} from "@/lib/tableShell";

type LocationButtonProps = {
  locationFilter: Selection;
  setLocationFilter: (keys: Selection) => void;
  locationOptions: string[];
};
const LocationButton = ({
  locationFilter,
  setLocationFilter,
  locationOptions,
}: LocationButtonProps) => {
  const selectedLocationKeys =
    locationFilter === "all" ? locationOptions : Array.from(locationFilter).map(String);

  return (
    <div>
      <Dropdown>
        <DropdownTrigger className="flex">
          <Button
            className={`${tableFilterTriggerClassName} text-white`}
            color="secondary"
            size="lg"
            variant="shadow"
            endContent={<ChevronDownIcon className="text-base sm:text-lg" />}>
            Location
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="light"
          classNames={tableDropdownMenuClassNames}
          itemClasses={tableDropdownItemClassNames}
          disallowEmptySelection
          aria-label="Table Columns"
          closeOnSelect={false}
          selectedKeys={locationFilter}
          selectionMode="multiple"
          onSelectionChange={setLocationFilter}>
          {locationOptions.map((location) => (
            <DropdownItem key={location}>
              <span className="block text-[0.85rem] font-medium uppercase tracking-[0.08em] sm:text-sm">
                {capitalize(location)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default LocationButton;
