import { useCallback, useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { ChassisLocation } from "../../API";
import { listChassisLocations } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  Selection,
} from "@nextui-org/react";

import BottomContent from "@/components/locationsTable/TablePagination";
import TopContentLocations from "@/components/locationsTable/TopContentLocations";

import AWSSubscriptionEventsLocations from "./AWSSubscriptionEventsLocations";
import DeleteButtonAWSLocation from "./buttons/DeleteButtonAWSLocation";
import ViewButtonAWS from "./buttons/ViewButtonAWS";
import EditButtonAWS from "./buttons/EditButtonAWS";
import useCheckedInventory from "@/hooks/useCheckedInInventory";
import { CheckedCircleIcon } from "../icons/CheckedCIrcleIcon";
import DragGesture from "../Gestures";

//ChassisTable Component:

//This component is responsible for displaying a list of trailer data in a table format.
//It incorporates functionality for creating, reading, updating, and deleting trailer records.

const LocationTable = () => {
  const [locations, setLocations] = useState<Array<ChassisLocation>>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [locationFilter, setLocationFilter] = useState<Selection>("all");
  const hasSearchFilter = Boolean(filterValue);

  const { isCheckedIn } = useCheckedInventory();

  const locationOptions = ["BAY AREA YARD", "LIBERTY YARD", "SELMA"];

  // Fetch trailers on component mount using GrapQL API
  useEffect(() => {
    const getChassisLocations = async () => {
      const client = generateClient();
      const allChassisLocation: any = await client.graphql({
        query: listChassisLocations,
      });
      const { data } = allChassisLocation;

      setLocations(data.listChassisLocations.items);
    };

    getChassisLocations();
  }, []);

  // Memoized filtered trailers based on search filter
  const filteredItems = useMemo(() => {
    let filteredLocations = locations
      ?.map((location: ChassisLocation) => ({
        __typename: location.__typename,
        id: location.id,
        chassisNumber: location.chassisNumber,
        location: location.location,
        container: location.container,
        createdAt: location.createdAt,
        updatedAt: location.updatedAt,
      }))
      .sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );

    if (hasSearchFilter) {
      filteredLocations = filteredLocations.filter((location) =>
        location
          .chassisNumber!.toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    if (
      locationFilter !== "all" &&
      Array.from(locationFilter).length !== locationOptions.length
    ) {
      filteredLocations = filteredLocations.filter((location) =>
        Array.from(locationFilter).includes(location.location as string)
      );
    }

    return filteredLocations;
  }, [
    locations,
    hasSearchFilter,
    locationFilter,
    locationOptions.length,
    filterValue,
  ]);

  // Calculate the total number of pages based on filtered items and rows per page
  let pages: number = Math.ceil(filteredItems?.length / rowsPerPage);

  // Memoized items to be displayed on the current page
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);
  const classNames = {
    table: [],
    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],

    td: [
      "text-2xl",
      "py-1",
      "pr-2",
      "pl-0",
      "h-[105px]",
      // changing the rows border radius
      // first

      "group-data-[odd=true]:bg-blue-200/50",
      "group-data-[odd=true]:text-grey",
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
      <AWSSubscriptionEventsLocations
        setLocations={setLocations}
        setFilterValue={setFilterValue}
      />
      <div className="px-2 z">
        {locations && (
          <div className="">
            <Table
              classNames={classNames}
              aria-label="Example static collection table"
              topContent={
                <TopContentLocations
                  filterValue={filterValue}
                  locations={locations}
                  setPage={setPage}
                  setFilterValue={setFilterValue}
                  setRowsPerPage={setRowsPerPage}
                  locationFilter={locationFilter}
                  setLocationFilter={setLocationFilter}
                  locationOptions={locationOptions}
                />
              }
              bottomContent={
                <BottomContent page={page} pages={pages} setPage={setPage} />
              }>
              <TableHeader>
                <TableColumn key="icon" className="text-xl">
                  {""}
                </TableColumn>
                <TableColumn key="chassisNumber" className="text-xl">
                  CHASSIS #
                </TableColumn>
                <TableColumn
                  key="location"
                  className="text-xl hidden sm:table-cell">
                  LOCATION
                </TableColumn>
                <TableColumn
                  key="container"
                  className="text-xl hidden md:table-cell">
                  CONTAINER
                </TableColumn>
                <TableColumn
                  key="updatedAt"
                  className="text-xl hidden md:table-cell">
                  LAST UPDATE
                </TableColumn>
                <TableColumn key="actions">{""}</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No chassis to display."} items={items}>
                {(item) => {
                  const newItem = {
                    id: item.id,
                    icon: (
                      <>
                        {!isCheckedIn(item.updatedAt) && (
                          <>
                            <DragGesture item={item} index={item.id} />
                          </>
                        )}
                        <div className=" w-5 p-0 m-0">
                          {isCheckedIn(item.updatedAt) ? (
                            <CheckedCircleIcon fill="rgba(60, 179, 113, 1)" />
                          ) : (
                            <CheckedCircleIcon fill="transparent" />
                          )}
                        </div>
                      </>
                    ),
                    chassisNumber: item.chassisNumber,
                    location: item.location,
                    container: item.container != null ? item.container : "N/A",
                    updatedAt: format(parseISO(item.updatedAt), "PPpp"),
                    actions: (
                      <div className=" flex justify-end items-center gap-1 lg:gap-5 ">
                        <EditButtonAWS location={item} isView={false} />
                        <ViewButtonAWS location={item} />
                        <DeleteButtonAWSLocation
                          id={item.id}
                          chassisNumber={item.chassisNumber as string}
                        />
                      </div>
                    ),
                  };
                  return (
                    <TableRow className="relative" key={newItem.id}>
                      {(columnKey) => {
                        return (
                          <TableCell
                            className={`${
                              columnKey !== "chassisNumber" &&
                              columnKey !== "actions" &&
                              columnKey !== "icon"
                                ? "hidden"
                                : "table-cell"
                            }  sm:${
                              columnKey === "container" ||
                              columnKey === "updatedAt"
                                ? "hidden"
                                : "table-cell"
                            } 
                            
                            
                            
                            md:table-cell`}>
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

export default LocationTable;
