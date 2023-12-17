import { ChassisLocation } from "@/API";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { capitalize } from "@/lib/utils";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { SetStateAction } from "react";

type LocationButtonProps = {
  locations: ChassisLocation[];
  locationFilter: Selection;
  setLocationFilter: (keys: Selection) => void;
  locationOptions: string[];
};
const LocationButton = ({
  locations,
  locationFilter,
  setLocationFilter,
  locationOptions,
}: LocationButtonProps) => {
  const containers = locations.filter(
    (location: ChassisLocation) => location.container != null
  );
  return (
    <div>
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
  );
};

export default LocationButton;
