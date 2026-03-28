import { ChassisLocation } from "@/API";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { SetStateAction } from "react";
import {
  tableDropdownItemClassNames,
  tableDropdownMenuClassNames,
  tableFilterTriggerClassName,
} from "@/lib/tableShell";

type ContainerButtonProps = {
  locations: ChassisLocation[];
  setFilterValue: (value: SetStateAction<string>) => void;
  setPage: (value: SetStateAction<number>) => void;
};
const ContainerButton = ({
  locations,
  setFilterValue,
  setPage,
}: ContainerButtonProps) => {
  const containers = locations.filter(
    (location: ChassisLocation) => location.container != null
  );
  return (
    <>
      {containers.length > 0 ? (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="shadow"
              color="warning"
              size="lg"
              className={`${tableFilterTriggerClassName} text-white`}>
              {containers.length}{" "}
              {containers.length === 1 ? "Container" : "Containers"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            variant="light"
            classNames={tableDropdownMenuClassNames}
            itemClasses={tableDropdownItemClassNames}>
            {containers.map((item) => (
              <DropdownItem
                key={item.id}
                onPress={() => {
                  setFilterValue(item.chassisNumber!);
                  setPage(1);
                }}>
                <div
                  title="Show chassis in the table"
                  className="text-center text-[0.85rem] font-medium uppercase tracking-[0.08em] sm:text-sm">
                  {item.container}
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : null}
    </>
  );
};

export default ContainerButton;
