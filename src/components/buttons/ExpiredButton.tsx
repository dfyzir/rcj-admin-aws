import { SetStateAction, useMemo } from "react";
import { useCheckDate } from "@/hooks/useCheckDate";
import { TrailerRCJ } from "@/API";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  divider,
} from "@nextui-org/react";

//ExpiredButton Component:

//This component represents a button that triggers a dropdown menu showing trailers
//with expired inspection or registration. It uses the useCheckDate hook to determine
//whether a trailer is expired. The dropdown allows the user to filter the table by
//selecting a specific expired trailer.

type ExpiredButtonProps = {
  trailers: TrailerRCJ[];
  setFilterValue: (value: SetStateAction<string>) => void;
  setPage: (value: SetStateAction<number>) => void;
};

const ExpiredButton = ({
  trailers,
  setFilterValue,
  setPage,
}: ExpiredButtonProps) => {
  // Use the useCheckDate hook to determine whether a trailer is expired
  const { isExpired } = useCheckDate();

  // Use useMemo to filter and memoize the list of expired trailers
  const expiredItems = useMemo(() => {
    let expiredTrailers = trailers?.map((trailer: TrailerRCJ) => ({
      __typename: trailer.__typename,
      id: trailer.id,
      chassisNumber: trailer.chassisNumber,
      vinNumber: trailer.vinNumber,
      plateNumber: trailer.plateNumber,
      inspectionExpiresAt: trailer.inspectionExpiresAt,
      inspectionFile: trailer.inspectionFile,
      registrationExpiresAt: trailer.registrationExpiresAt,
      registrationFile: trailer.registrationFile,
      createdAt: trailer.createdAt,
      updatedAt: trailer.updatedAt,
    }));

    expiredTrailers = expiredTrailers.filter(
      (trailer) =>
        (trailer.inspectionExpiresAt &&
          isExpired(trailer.inspectionExpiresAt)) ||
        (trailer.registrationExpiresAt &&
          isExpired(trailer.registrationExpiresAt))
    );

    return expiredTrailers;
  }, [isExpired, trailers]);

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

export default ExpiredButton;
