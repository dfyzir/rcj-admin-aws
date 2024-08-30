import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { TrailerRCJ } from "../../API";
import { listTrailerRCJS } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";

import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

import ViewButtonAWS from "./buttons/ViewButtonAWS";
import { ExpiredWarningIcon } from "@/components/icons/ExpiredWarningIcon";
import BottomContent from "@/components/chassisTable/TablePagination";
import TopContent from "./TopContent";
import AWSSubscriptionEvents from "@/components/chassisTable/AWSSubscriptionEvents";
import { useCheckDate } from "@/hooks/useCheckDate";
import { ExpireSoonWarningIcon } from "@/components/icons/ExpireSoonWarningIcon";

//ChassisTable Component:

//This component is responsible for displaying a list of trailer data in a table format.
//It incorporates functionality for creating, reading, updating, and deleting trailer records.

const FindChassisTable = () => {
  const [trailers, setTrailers] = useState<Array<TrailerRCJ>>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<
    SortDescriptor | undefined
  >({
    column: "registrationExpiresAt",
    direction: "ascending",
  });
  const hasSearchFilter = Boolean(filterValue);

  const { isExpired, isExpireSoon } = useCheckDate(); // Custom hook to check expiration and soon-to-expire dates

  // Fetch trailers on component mount using GrapQL API
  useEffect(() => {
    const getTrailersRCJ = async () => {
      const client = generateClient();
      const allTrailerRCJ: any = await client.graphql({
        query: listTrailerRCJS,
      });
      const { data } = allTrailerRCJ;

      setTrailers(data.listTrailerRCJS.items);
    };

    getTrailersRCJ();
  }, []);

  // Handle sorting
  const handleSortChange = (descriptor: SortDescriptor | undefined) => {
    setSortDescriptor(descriptor);
  };

  // Memoized filtered trailers based on search filter
  const filteredItems = useMemo(() => {
    let filteredTrailers = trailers?.map((trailer: TrailerRCJ) => ({
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

    if (hasSearchFilter) {
      filteredTrailers = filteredTrailers.filter((trailer) =>
        trailer.chassisNumber!.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (sortDescriptor !== undefined && sortDescriptor.column !== undefined) {
      filteredTrailers = filteredTrailers.sort((a, b) => {
        // eslint-disable-next-line
        const column = sortDescriptor.column as keyof TrailerRCJ;
        let first = parseISO(a[column] as string);
        let second = parseISO(b[column] as string);
        let cmp = first < second ? -1 : 1;

        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }

        return cmp;
      });
    }

    return filteredTrailers;
  }, [trailers, hasSearchFilter, sortDescriptor, filterValue]);

  // Calculate the total number of pages based on filtered items and rows per page
  let pages: number = Math.ceil(filteredItems?.length / rowsPerPage);

  // Memoized items to be displayed on the current page
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);
  const classNames = {
    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    td: [
      "text-2xl",
      "py-7",
      "px-0",

      // changing the rows border radius
      // first
      "group-data-[first=true]:first:before:rounded-none",
      "group-data-[first=true]:last:before:rounded-none",
      // middle
      "group-data-[middle=true]:before:rounded-none",
      // last
      "group-data-[last=true]:first:before:rounded-none",
      "group-data-[last=true]:last:before:rounded-none",
    ],
  };
  return (
    <div className="mb-16 container mx-auto mt-16">
      <AWSSubscriptionEvents
        setTrailers={setTrailers}
        setFilterValue={setFilterValue}
      />
      <div className="px-5 ">
        {trailers && (
          <div className="">
            <Table
              classNames={classNames}
              isStriped
              aria-label="Example static collection table"
              topContent={
                <TopContent
                  filterValue={filterValue}
                  trailers={trailers}
                  setPage={setPage}
                  setFilterValue={setFilterValue}
                  setRowsPerPage={setRowsPerPage}
                />
              }
              bottomContent={
                <BottomContent page={page} pages={pages} setPage={setPage} />
              }
              sortDescriptor={sortDescriptor}
              onSortChange={handleSortChange}>
              <TableHeader>
                <TableColumn key="chassisNumber" className="text-xl">
                  CHASSIS #
                </TableColumn>
                <TableColumn
                  key="vinNumber"
                  className="text-xl hidden xl:table-cell">
                  VIN
                </TableColumn>
                <TableColumn
                  key="plateNumber"
                  className="text-xl hidden lg:table-cell"
                  align="end">
                  PLATE #
                </TableColumn>
                <TableColumn
                  key="inspectionExpiresAt"
                  className="text-xl hidden md:table-cell"
                  allowsSorting>
                  INSPECTION
                </TableColumn>
                <TableColumn
                  key="registrationExpiresAt"
                  className="text-xl hidden md:table-cell"
                  allowsSorting>
                  REGISTRATION
                </TableColumn>
                <TableColumn key="actions">{""}</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No chassis to display."} items={items}>
                {(item) => {
                  const inspectionDate = new Date(
                    item.inspectionExpiresAt!
                  ).toISOString();

                  const registrationDate = new Date(
                    item.registrationExpiresAt!
                  ).toISOString();

                  const newItem = {
                    id: item.id,
                    chassisNumber: item.chassisNumber,
                    vinNumber: item.vinNumber,
                    plateNumber: item.plateNumber,
                    inspectionExpiresAt: item.inspectionExpiresAt ? (
                      <div
                        className={`flex gap-3 items-center ${
                          isExpired(inspectionDate) ? "text-red-600" : null
                        } ${
                          isExpireSoon(inspectionDate)
                            ? "text-orange-500"
                            : null
                        }`}>
                        {format(parseISO(item.inspectionExpiresAt), "PP")}

                        {isExpired(inspectionDate) ? (
                          <ExpiredWarningIcon />
                        ) : null}
                        {isExpireSoon(inspectionDate) ? (
                          <ExpireSoonWarningIcon />
                        ) : null}
                      </div>
                    ) : (
                      "N/A"
                    ),
                    registrationExpiresAt: item.registrationExpiresAt ? (
                      <div
                        className={`flex gap-3 items-center  ${
                          isExpired(registrationDate) ? "text-red-600" : null
                        } ${
                          isExpireSoon(registrationDate)
                            ? "text-orange-500"
                            : null
                        }`}>
                        {format(parseISO(item.registrationExpiresAt), "PP")}

                        {isExpired(registrationDate) ? (
                          <ExpiredWarningIcon />
                        ) : null}
                        {isExpireSoon(registrationDate) ? (
                          <ExpireSoonWarningIcon />
                        ) : null}
                      </div>
                    ) : (
                      "N/A"
                    ),
                    actions: (
                      <div className="relative flex justify-end items-center gap-1 sm:gap-5">
                        <ViewButtonAWS trailer={item} />
                        {/* <EditButtonAWS trailer={item} isView={false} />
                        <DeleteButtonAWS
                          id={item.id}
                          chassisNumber={item.chassisNumber as string}
                        /> */}
                      </div>
                    ),
                  };
                  return (
                    <TableRow className="" key={newItem.id}>
                      {(columnKey) => {
                        return (
                          <TableCell
                            className={`${
                              columnKey !== "chassisNumber" &&
                              columnKey !== "actions"
                                ? "hidden"
                                : "table-cell"
                            }  md:${
                              columnKey === "vinNumber" ||
                              columnKey === "plateNumber"
                                ? "hidden"
                                : "table-cell"
                            } lg:${
                              columnKey === "vinNumber"
                                ? "hidden"
                                : "table-cell"
                            } xl:table-cell`}>
                            {getKeyValue(newItem, columnKey)}
                          </TableCell>
                        );
                      }}
                    </TableRow>
                  );
                }}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindChassisTable;
