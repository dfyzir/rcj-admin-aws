import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { TrailerRCJ } from "../../API";
import { listTrailerRCJS } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Key, Selection } from "@react-types/shared";
import { SortDescriptor } from "@heroui/react";

import DeleteButtonAWS from "@/components/buttons/DeleteButtonAWS";
import EditButtonAWS from "@/components/buttons/EditButtonAWS";
import ViewButtonAWS from "@/components/buttons/ViewButtonAWS";
import AddTrailerButtonAWS from "@/components/buttons/AddTrailerButtonAWS";
import { ExpiredWarningIcon } from "@/components/icons/ExpiredWarningIcon";
import BottomContent from "@/components/chassisTable/TablePagination";
import TopContent from "@/components/chassisTable/TopContent";
import CollapsibleTableControls from "@/components/common/CollapsibleTableControls";
import AWSSubscriptionEvents from "@/components/chassisTable/AWSSubscriptionEvents";
import { useCheckDate } from "@/hooks/useCheckDate";
import { ExpireSoonWarningIcon } from "@/components/icons/ExpireSoonWarningIcon";
import { usePersistedRowsPerPage } from "@/hooks/usePersistedRowsPerPage";
import { useTableScrollShadows } from "@/hooks/useTableScrollShadows";
import {
  tableHoverRowClassName,
  tablePageShellClassName,
  tableScrollFrameClassName,
  tableScrollRegionClassName,
} from "@/lib/tableShell";

const headerGridClassName =
  "grid grid-cols-[1.5rem_minmax(0,1fr)_8.5rem] gap-x-4 gap-y-3 px-6 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-default-500 md:text-sm md:tracking-[0.16em] lg:grid-cols-[1.5rem_minmax(0,1fr)_minmax(10rem,0.85fr)_minmax(10rem,0.85fr)_8.5rem] lg:gap-x-6 xl:grid-cols-[1.5rem_minmax(0,1fr)_minmax(8rem,0.7fr)_minmax(10rem,0.85fr)_minmax(10rem,0.85fr)_8.5rem] 2xl:grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,1fr)_minmax(8rem,0.7fr)_minmax(10rem,0.85fr)_minmax(10rem,0.85fr)_8.5rem]";

const rowGridClassName =
  "grid grid-cols-[1.5rem_minmax(0,1fr)_8.5rem] items-center gap-x-4 gap-y-4 px-6 py-5 text-[1rem] leading-snug md:text-xl md:leading-normal lg:grid-cols-[1.5rem_minmax(0,1fr)_minmax(10rem,0.85fr)_minmax(10rem,0.85fr)_8.5rem] lg:gap-x-6 lg:py-6 xl:grid-cols-[1.5rem_minmax(0,1fr)_minmax(8rem,0.7fr)_minmax(10rem,0.85fr)_minmax(10rem,0.85fr)_8.5rem] 2xl:grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,1fr)_minmax(8rem,0.7fr)_minmax(10rem,0.85fr)_minmax(10rem,0.85fr)_8.5rem]";

const shadowOverlayClassName =
  "pointer-events-none absolute inset-x-0 inset-y-0 z-10";

const stripedRowClassName = "bg-slate-100/95 dark:bg-slate-900/60";

const selectedRowClassName =
  "ring-2 ring-violet-400/40 ring-inset dark:ring-violet-300/30";

const topShadowClassName =
  "absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-200 ease-out dark:from-white/25";

const bottomShadowClassName =
  "absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/45 to-transparent transition-opacity duration-200 ease-out dark:from-white/25";

const sortableHeaderButtonClassName =
  "inline-flex items-center gap-2 text-left text-sm font-semibold uppercase tracking-[0.16em] text-default-500 transition-colors hover:text-foreground";

const checkboxClassName =
  "h-5 w-5 rounded border-slate-300 bg-transparent accent-violet-500 dark:border-white/20";

const normalizeSearchValue = (value: string | null | undefined) =>
  (value ?? "").toLowerCase().replace(/\s+/g, "");

const ChassisTable = () => {
  const [trailers, setTrailers] = useState<Array<TrailerRCJ>>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = usePersistedRowsPerPage();
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<
    SortDescriptor | undefined
  >({
    column: "registrationExpiresAt",
    direction: "ascending",
  });
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<Key>());
  const hasSearchFilter = Boolean(filterValue);

  const { isExpired, isExpireSoon } = useCheckDate();

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

  const handleSortChange = (
    column: "inspectionExpiresAt" | "registrationExpiresAt",
  ) => {
    setSortDescriptor((current) => {
      if (current?.column === column) {
        return {
          column,
          direction:
            current.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column,
        direction: "ascending",
      };
    });
  };

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
      const normalizedFilterValue = normalizeSearchValue(filterValue);

      filteredTrailers = filteredTrailers.filter((trailer) =>
        [
          trailer.chassisNumber,
          trailer.vinNumber,
          trailer.plateNumber,
        ].some((value) =>
          normalizeSearchValue(value).includes(normalizedFilterValue),
        ),
      );
    }

    if (sortDescriptor?.column !== undefined) {
      filteredTrailers = filteredTrailers.sort((a, b) => {
        const column = sortDescriptor.column as keyof TrailerRCJ;
        const first = parseISO(a[column] as string);
        const second = parseISO(b[column] as string);
        let cmp = first < second ? -1 : 1;

        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }

        return cmp;
      });
    }

    return filteredTrailers;
  }, [trailers, hasSearchFilter, sortDescriptor, filterValue]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  const selectedKeySet = useMemo(() => {
    if (selectedKeys === "all") {
      return new Set<Key>(
        filteredItems
          .map((trailer) => trailer.chassisNumber)
          .filter((value): value is string => Boolean(value)),
      );
    }

    return new Set<Key>(selectedKeys as Set<Key>);
  }, [filteredItems, selectedKeys]);

  const areAllFilteredSelected =
    filteredItems.length > 0 &&
    filteredItems.every((trailer) =>
      selectedKeySet.has(String(trailer.chassisNumber)),
    );

  const { scrollRef, showTopShadow, showBottomShadow } = useTableScrollShadows(
    "chassis-table",
    [items.length, page, rowsPerPage, selectedKeySet.size],
  );

  const renderSortArrow = (
    column: "inspectionExpiresAt" | "registrationExpiresAt",
  ) => {
    if (sortDescriptor?.column !== column) {
      return null;
    }

    return (
      <span className="text-default-400">
        {sortDescriptor.direction === "ascending" ? "↑" : "↓"}
      </span>
    );
  };

  const renderExpirationCell = (
    value: string | null | undefined,
    dateIso: string | null,
  ) => {
    if (!value || !dateIso) {
      return <span className="inline-flex min-w-0 whitespace-nowrap">N/A</span>;
    }

    return (
      <div
        className={`inline-flex min-w-0 items-center gap-2 whitespace-nowrap ${
          isExpired(dateIso) ? "text-red-600" : ""
        } ${isExpireSoon(dateIso) ? "text-orange-500" : ""}`}>
        {format(parseISO(value), "PP")}
        {isExpired(dateIso) ? <ExpiredWarningIcon /> : null}
        {isExpireSoon(dateIso) ? <ExpireSoonWarningIcon /> : null}
      </div>
    );
  };

  const toggleRowSelection = (chassisNumber: string) => {
    setSelectedKeys((current) => {
      const next = new Set<Key>(
        current === "all" ? Array.from(selectedKeySet) : Array.from(current),
      );

      if (next.has(chassisNumber)) {
        next.delete(chassisNumber);
      } else {
        next.add(chassisNumber);
      }

      return next as Selection;
    });
  };

  const toggleSelectAll = () => {
    if (areAllFilteredSelected) {
      setSelectedKeys(new Set<Key>());
      return;
    }

    setSelectedKeys(
      new Set<Key>(
        filteredItems
          .map((trailer) => trailer.chassisNumber)
          .filter((value): value is string => Boolean(value)),
      ) as Selection,
    );
  };

  return (
    <div className={tablePageShellClassName}>
      <AWSSubscriptionEvents
        setTrailers={setTrailers}
        setFilterValue={setFilterValue}
      />
      <CollapsibleTableControls>
        <TopContent
          filterValue={filterValue}
          trailers={trailers}
          setPage={setPage}
          setFilterValue={setFilterValue}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          selectedKeys={selectedKeys}
        />
      </CollapsibleTableControls>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className={`${tableScrollFrameClassName} flex min-h-0 flex-col`}>
          <div className="shrink-0 border-b border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-950">
            <div className={headerGridClassName}>
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className={checkboxClassName}
                  checked={areAllFilteredSelected}
                  onChange={toggleSelectAll}
                  aria-label="Select all chassis"
                />
              </div>
              <div>Chassis #</div>
              <div className="hidden 2xl:block">VIN</div>
              <div className="hidden xl:block">Plate #</div>
              <button
                className={`hidden lg:inline-flex ${sortableHeaderButtonClassName}`}
                type="button"
                onClick={() => handleSortChange("inspectionExpiresAt")}>
                Inspection
                {renderSortArrow("inspectionExpiresAt")}
              </button>
              <button
                className={`hidden lg:inline-flex ${sortableHeaderButtonClassName}`}
                type="button"
                onClick={() => handleSortChange("registrationExpiresAt")}>
                Registration
                {renderSortArrow("registrationExpiresAt")}
              </button>
              <div className="justify-self-end text-right">
                <span className="sr-only">Actions</span>
              </div>
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
                    const chassisNumber = String(item.chassisNumber);
                    const inspectionDate = item.inspectionExpiresAt
                      ? new Date(item.inspectionExpiresAt).toISOString()
                      : null;
                    const registrationDate = item.registrationExpiresAt
                      ? new Date(item.registrationExpiresAt).toISOString()
                      : null;
                    const isSelected = selectedKeySet.has(chassisNumber);

                    return (
                      <div
                        key={item.id}
                        className={`${rowGridClassName} ${
                          index % 2 === 1 ? stripedRowClassName : ""
                        } ${isSelected ? selectedRowClassName : ""} ${tableHoverRowClassName}`}>
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            className={checkboxClassName}
                            checked={isSelected}
                            onChange={() => toggleRowSelection(chassisNumber)}
                            aria-label={`Select chassis ${chassisNumber}`}
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="inline-block whitespace-nowrap">
                            {item.chassisNumber}
                          </span>
                        </div>
                        <div className="hidden min-w-0 2xl:block">
                          <span className="inline-block whitespace-nowrap">
                            {item.vinNumber}
                          </span>
                        </div>
                        <div className="hidden min-w-0 xl:block">
                          <span className="inline-block min-w-[7ch] whitespace-nowrap">
                            {item.plateNumber ?? "N/A"}
                          </span>
                        </div>
                        <div className="hidden min-w-0 lg:block">
                          {renderExpirationCell(
                            item.inspectionExpiresAt,
                            inspectionDate,
                          )}
                        </div>
                        <div className="hidden min-w-0 lg:block">
                          {renderExpirationCell(
                            item.registrationExpiresAt,
                            registrationDate,
                          )}
                        </div>
                        <div className="justify-self-end">
                          <div className="relative flex items-center justify-end gap-1 sm:gap-5">
                            <ViewButtonAWS trailer={item} />
                            <EditButtonAWS trailer={item} isView={false} />
                            <DeleteButtonAWS
                              id={item.id}
                              chassisNumber={chassisNumber}
                            />
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
              <AddTrailerButtonAWS
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

export default ChassisTable;
