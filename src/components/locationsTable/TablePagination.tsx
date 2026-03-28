import { ReactNode, SetStateAction, useCallback } from "react";
import { Button, Pagination } from "@heroui/react";
import {
  tablePaginationButtonClassName,
  tablePaginationClassNames,
} from "@/lib/tableShell";
import { useHorizontalScrollShadows } from "@/hooks/useHorizontalScrollShadows";
import { useDraggableHorizontalScroll } from "@/hooks/useDraggableHorizontalScroll";

/*
  TablePagination Component
  This component provides pagination controls for a table.
*/

type TablePaginationProps = {
  page: number;
  pages: number;
  setPage: (value: SetStateAction<number>) => void;
  mobileAction?: ReactNode;
};

const TablePagination = ({
  page,
  pages,
  setPage,
  mobileAction,
}: TablePaginationProps) => {
  const totalPages = Math.max(pages, 1);
  const { scrollRef, showLeftShadow, showRightShadow } =
    useHorizontalScrollShadows([totalPages, page, mobileAction]);
  const dragScrollHandlers = useDraggableHorizontalScroll();

  const onNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, setPage, totalPages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  return (
    <div className="mt-4 border-t border-divider pt-4">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl">
          <div
            ref={scrollRef}
            className="cursor-grab overflow-x-auto overflow-y-hidden py-1 overscroll-x-contain select-none active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden"
            {...dragScrollHandlers}>
            <div className={`inline-flex min-w-max ${mobileAction ? "pr-4" : "pr-1"}`}>
              <Pagination
                size="lg"
                showShadow
                color="secondary"
                classNames={tablePaginationClassNames}
                page={page}
                total={totalPages}
                onChange={(page) => setPage(page)}
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-1 left-0 top-1 z-10 w-8 bg-gradient-to-r from-black/45 to-transparent transition-opacity duration-200 ease-out dark:from-white/25 dark:to-transparent ${
              showLeftShadow ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-1 right-0 top-1 z-10 w-8 bg-gradient-to-l from-black/45 to-transparent transition-opacity duration-200 ease-out dark:from-white/25 dark:to-transparent ${
              showRightShadow ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        {mobileAction ? (
          <div className="flex shrink-0 md:hidden">{mobileAction}</div>
        ) : null}
        <div className="hidden gap-2 md:flex md:justify-end">
          <Button
            isDisabled={page === 1}
            size="lg"
            variant="solid"
            className={tablePaginationButtonClassName}
            onPress={onPreviousPage}>
            Previous
          </Button>
          <Button
            isDisabled={page === totalPages}
            size="lg"
            variant="solid"
            className={tablePaginationButtonClassName}
            onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
