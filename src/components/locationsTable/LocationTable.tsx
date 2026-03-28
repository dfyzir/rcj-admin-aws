import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { ChassisLocation } from "../../API";
import { listChassisLocations } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Selection } from "@heroui/react";

import BottomContent from "@/components/locationsTable/TablePagination";
import TopContentLocations from "@/components/locationsTable/TopContentLocations";
import CollapsibleTableControls from "@/components/common/CollapsibleTableControls";
import AWSSubscriptionEventsLocations from "./AWSSubscriptionEventsLocations";
import DeleteButtonAWSLocation from "./buttons/DeleteButtonAWSLocation";
import ViewButtonAWS from "./buttons/ViewButtonAWS";
import EditButtonAWS from "./buttons/EditButtonAWS";
import AddLocationButtonAWS from "./buttons/AddLocationButtonAWS";
import useCheckedInventory from "@/hooks/useCheckedInInventory";
import { CheckedCircleIcon } from "../icons/CheckedCIrcleIcon";
import DragGesture from "./Gestures";
import { usePersistedRowsPerPage } from "@/hooks/usePersistedRowsPerPage";
import { useTableScrollShadows } from "@/hooks/useTableScrollShadows";
import {
  tableHoverRowClassName,
  tablePageShellClassName,
  tableScrollFrameClassName,
  tableScrollRegionClassName,
} from "@/lib/tableShell";

const headerGridClassName =
  "grid grid-cols-[minmax(0,1fr)_5.5rem] gap-x-4 gap-y-3 px-6 py-4 pl-9 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-default-500 md:grid-cols-[minmax(0,1fr)_minmax(11rem,0.95fr)_8.5rem] md:gap-x-6 md:text-sm md:tracking-[0.16em] xl:grid-cols-[minmax(0,1fr)_minmax(11rem,0.95fr)_minmax(12rem,1fr)_8.5rem] 2xl:grid-cols-[minmax(0,1fr)_minmax(11rem,0.95fr)_minmax(8rem,0.7fr)_minmax(12rem,1fr)_8.5rem]";

const rowGridClassName =
  "grid grid-cols-[minmax(0,1fr)_5.5rem] items-center gap-x-4 gap-y-4 px-6 py-5 pl-9 text-[1rem] leading-snug md:grid-cols-[minmax(0,1fr)_minmax(11rem,0.95fr)_8.5rem] md:gap-x-6 md:py-6 md:text-xl md:leading-normal xl:grid-cols-[minmax(0,1fr)_minmax(11rem,0.95fr)_minmax(12rem,1fr)_8.5rem] 2xl:grid-cols-[minmax(0,1fr)_minmax(11rem,0.95fr)_minmax(8rem,0.7fr)_minmax(12rem,1fr)_8.5rem]";

const shadowOverlayClassName =
  "pointer-events-none absolute inset-x-0 inset-y-0 z-10";

const stripedRowClassName = "bg-slate-100/95 dark:bg-slate-900/60";

const topShadowClassName =
  "absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-200 ease-out dark:from-white/25";

const bottomShadowClassName =
  "absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/45 to-transparent transition-opacity duration-200 ease-out dark:from-white/25";

const checkHintClassName =
  "flex items-center gap-2 px-6 py-2 pl-9 text-[11px] font-medium uppercase tracking-[0.14em] text-default-400 md:hidden";

const LocationTable = () => {
  const [locations, setLocations] = useState<Array<ChassisLocation>>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = usePersistedRowsPerPage();
  const [filterValue, setFilterValue] = useState("");
  const [locationFilter, setLocationFilter] = useState<Selection>("all");
  const [readyRows, setReadyRows] = useState<Record<string, boolean>>({});
  const [pendingRows, setPendingRows] = useState<Record<string, boolean>>({});
  const hasSearchFilter = Boolean(filterValue);

  const { isCheckedIn } = useCheckedInventory();

  const locationOptions = ["BAY AREA YARD", "LIBERTY YARD", "SELMA"];

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
        location.chassisNumber!
          .toLowerCase()
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

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  const { scrollRef, showTopShadow, showBottomShadow } =
    useTableScrollShadows("yard-inventory", [items.length, page, rowsPerPage]);

  return (
    <div className={tablePageShellClassName}>
      <AWSSubscriptionEventsLocations
        setLocations={setLocations}
        setFilterValue={setFilterValue}
      />
      <CollapsibleTableControls>
        <TopContentLocations
          filterValue={filterValue}
          locations={locations}
          setPage={setPage}
          setFilterValue={setFilterValue}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          locationOptions={locationOptions}
        />
      </CollapsibleTableControls>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className={`${tableScrollFrameClassName} flex min-h-0 flex-col`}>
          <div className="shrink-0 border-b border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-950">
            <div className={checkHintClassName}>
              <CheckedCircleIcon fill="rgba(60, 179, 113, 0.55)" />
              <span>Swipe right to check in</span>
            </div>
            <div className={headerGridClassName}>
              <div>Chassis #</div>
              <div className="hidden md:block">Location</div>
              <div className="hidden 2xl:block">Container</div>
              <div className="hidden xl:block">Last Update</div>
              <div className="justify-self-end">{""}</div>
            </div>
          </div>
          <div className="relative min-h-0 flex-1">
            <div ref={scrollRef} className={tableScrollRegionClassName}>
              {items.length === 0 ? (
                <div className="flex min-h-full items-center justify-center px-6 py-16 text-lg text-default-400">
                  No chassis to display.
                </div>
              ) : (
                <div className="min-h-full">
                  {items.map((item, index) => {
                    const checkedIn = isCheckedIn(item.updatedAt);
                    const isReadyToCheckIn = Boolean(readyRows[item.id]);
                    const isPendingCheckIn = Boolean(pendingRows[item.id]);
                    const showActiveCheck =
                      checkedIn || isReadyToCheckIn || isPendingCheckIn;

                    return (
                      <div
                        key={item.id}
                        className={`relative overflow-hidden ${
                          index % 2 === 1 ? stripedRowClassName : ""
                        } ${tableHoverRowClassName}`}>
                        {!checkedIn ? (
                          <DragGesture
                            item={item}
                            index={item.id}
                            onReadyChange={(ready) => {
                              setReadyRows((currentRows) => {
                                if (ready === Boolean(currentRows[item.id])) {
                                  return currentRows;
                                }

                                if (!ready) {
                                  const nextRows = { ...currentRows };
                                  delete nextRows[item.id];
                                  return nextRows;
                                }

                                return {
                                  ...currentRows,
                                  [item.id]: true,
                                };
                              });
                            }}
                            onCommit={() => {
                              setPendingRows((currentRows) => ({
                                ...currentRows,
                                [item.id]: true,
                              }));
                              setReadyRows((currentRows) => {
                                const nextRows = { ...currentRows };
                                delete nextRows[item.id];
                                return nextRows;
                              });
                            }}
                          />
                        ) : null}
                        <div className={`${rowGridClassName} relative z-10`}>
                          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_1.75rem] items-center gap-2 sm:gap-3">
                            <span className="min-w-0 whitespace-nowrap">
                              {item.chassisNumber}
                            </span>
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center justify-self-center rounded-full transition-colors duration-150 sm:h-7 sm:w-7 ${
                                showActiveCheck
                                  ? "bg-emerald-500/15"
                                  : "bg-slate-200/70 dark:bg-white/5"
                              }`}>
                              <CheckedCircleIcon
                                fill={
                                  showActiveCheck
                                    ? "rgba(60, 179, 113, 1)"
                                    : "rgba(148, 163, 184, 0.35)"
                                }
                              />
                            </span>
                          </div>
                          <div className="hidden min-w-0 break-words md:block">
                            {item.location}
                          </div>
                          <div className="hidden min-w-0 break-words 2xl:block">
                            {item.container ?? "N/A"}
                          </div>
                          <div className="hidden min-w-0 whitespace-nowrap xl:block">
                            {format(parseISO(item.updatedAt), "PPpp")}
                          </div>
                          <div className="justify-self-end">
                            <div className="flex items-center justify-end gap-1 lg:gap-5">
                              <EditButtonAWS location={item} isView={false} />
                              <ViewButtonAWS location={item} />
                              <DeleteButtonAWSLocation
                                id={item.id}
                                chassisNumber={item.chassisNumber as string}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={shadowOverlayClassName}>
              <div
                aria-hidden="true"
                className={`${topShadowClassName} ${
                  showTopShadow ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                aria-hidden="true"
                className={`${bottomShadowClassName} ${
                  showBottomShadow ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="mt-auto shrink-0">
          <BottomContent
            page={page}
            pages={pages}
            setPage={setPage}
            mobileAction={
              <AddLocationButtonAWS
                size="md"
                className="text-sm font-semibold sm:text-base"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LocationTable;
