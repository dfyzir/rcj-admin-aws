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

/*ExpireSoonButton Component:
 
This component represents a button that triggers a dropdown menu showing trailers
with inspections or registrations expiring soon. It uses the useCheckDate hook to
determine whether a trailer is expiring soon. The dropdown allows the user to filter
the table by selecting a specific trailer that will expire soon.*/

type ExpireSoonButtonProps = {
  trailers: TrailerRCJ[];
  setFilterValue: (value: SetStateAction<string>) => void;
  setPage: (value: SetStateAction<number>) => void;
};

const ExpireSoonButton = ({
  trailers,
  setFilterValue,
  setPage,
}: ExpireSoonButtonProps) => {
  // Use the useCheckDate hook to determine whether a trailer is expiring soon
  const { isExpireSoon } = useCheckDate();
  // Use useMemo to filter and memoize the list of trailers expiring soon
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
        (trailer.inspectionExpiresAt
          ? isExpireSoon(trailer.inspectionExpiresAt)
          : null) ||
        (trailer.registrationExpiresAt
          ? isExpireSoon(trailer.registrationExpiresAt)
          : null)
    );

    return expiredTrailers;
  }, [isExpireSoon, trailers]);

  return (
    <>
      {expiredItems.length > 0 ? (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="shadow"
              color="warning"
              size="lg"
              className="text-xl font-semibold text-white ">
              {expiredItems.length} expire soon
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {expiredItems.map((item) => (
              <DropdownItem
                key={item.id}
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
    </>
  );
};

export default ExpireSoonButton;
