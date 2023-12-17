import { ChassisLocation } from "@/API";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SetStateAction } from "react";

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
    <div>
      {containers.length > 0 ? (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="shadow"
              color="warning"
              size="lg"
              className="text-xl font-semibold text-white">
              {containers.length}{" "}
              {containers.length === 1 ? "Container" : "Containers"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {containers.map((item) => (
              <DropdownItem
                key={item.id}
                className="text-3xl"
                onPress={() => {
                  setFilterValue(item.chassisNumber!);
                  setPage(1);
                }}>
                <div
                  title="Show chassis in the table"
                  className="text-center font-semibold text-xl ">
                  {item.chassisNumber}
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default ContainerButton;
