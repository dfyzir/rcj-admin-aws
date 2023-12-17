import { SetStateAction, useMemo } from "react";
import { ChassisLocation } from "@/API";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import useTwoDaysDifference from "@/hooks/useCheckContainerDate";

//ExpiredButton Component:

//This component represents a button that triggers a dropdown menu showing trailers
//with expired inspection or registration. It uses the useCheckDate hook to determine
//whether a trailer is expired. The dropdown allows the user to filter the table by
//selecting a specific expired trailer.

type ExpiredContainerButtonProps = {
  locations: ChassisLocation[];
  setFilterValue: (value: SetStateAction<string>) => void;
  setPage: (value: SetStateAction<number>) => void;
};

const ExpiredContainerButton = ({
  locations,
  setFilterValue,
  setPage,
}: ExpiredContainerButtonProps) => {
  // Use the useCheckDate hook to determine whether a trailer is expired
  const { isContainerExpired } = useTwoDaysDifference();

  // Use useMemo to filter and memoize the list of expired trailers
  const expiredItems = useMemo(() => {
    let expiredContainers = locations?.map((location: ChassisLocation) => ({
      __typename: location.__typename,
      id: location.id,
      chassisNumber: location.chassisNumber,
      location: location.location,
      container: location.container,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt,
    }));

    expiredContainers = expiredContainers.filter(
      (container) =>
        container.container != null &&
        container.updatedAt &&
        isContainerExpired(container.updatedAt)
    );

    return expiredContainers;
  }, [isContainerExpired, locations]);

  return (
    <div>
      {expiredItems.length > 0 ? (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="shadow"
              color="danger"
              size="lg"
              className="text-xl font-semibold text-white">
              {expiredItems.length} expired
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {expiredItems.map((item) => (
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
                  {item.container}
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default ExpiredContainerButton;
