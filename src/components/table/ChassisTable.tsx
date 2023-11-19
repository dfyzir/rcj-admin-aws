import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { TrailerRCJ } from "../../API";
import { listTrailerRCJS } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";

import DeleteButtonAWS from "@/components/buttons/DeleteButtonAWS";
import EditButtonAWS from "@/components/buttons/EditButtonAWS";
import ViewButtonAWS from "@/components/buttons/ViewButtonAWS";
import { ExpiredWarningIcon } from "@/components/icons/ExpiredWarningIcon";
import BottomContent from "@/components/table/BottomContent";
import TopContent from "@/components/table/TopContent";
import SubscriptionDummy from "@/components/table/SubscriptionDummy";
import { useCheckDate } from "@/hooks/useCheckDate";
import { ExpireSoonWarningIcon } from "@/components/icons/ExpireSoonWarningIcon";
import { EditIcon } from "../icons/EditIcon";

const ChassisTable = () => {
  const [trailers, setTrailers] = useState<Array<TrailerRCJ>>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const { isExpired, isExpireSoon } = useCheckDate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    return filteredTrailers;
  }, [trailers, hasSearchFilter, filterValue]);

  let pages: number = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);
  const classNames = useMemo(
    () => ({
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "text-2xl",
        "py-5",
        "pb-10",
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",

        "group-data-[middle=true]:before:rounded-none",

        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );
  return (
    <div className="mb-16 container mx-auto mt-5">
      <SubscriptionDummy
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
              }>
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
                  className="text-xl hidden md:table-cell">
                  INSPECTION
                </TableColumn>
                <TableColumn
                  key="registrationExpiresAt"
                  className="text-xl hidden md:table-cell">
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
                        <EditButtonAWS trailer={item} isView={false} />
                        <DeleteButtonAWS
                          id={item.id}
                          chassisNumber={item.chassisNumber as string}
                        />
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

export default ChassisTable;