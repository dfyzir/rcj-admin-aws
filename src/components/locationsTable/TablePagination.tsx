import { SetStateAction, useCallback } from "react";
import { Button, Divider, Pagination } from "@nextui-org/react";

/*
  TablePagination Component
  This component provides pagination controls for a table.
*/

type TablePaginationProps = {
  page: number;
  pages: number;
  setPage: (value: SetStateAction<number>) => void;
};

const TablePagination = ({ page, pages, setPage }: TablePaginationProps) => {
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages, setPage]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  return (
    <div>
      <Divider className="mb-10" />
      <div className="flex w-full justify-between mb-5 gap-5">
        <Pagination
          size="lg"
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
        <div className="hidden md:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={page === 1}
            size="lg"
            variant="solid"
            onPress={onPreviousPage}>
            Previous
          </Button>
          <Button
            isDisabled={page === pages}
            size="lg"
            variant="solid"
            onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
