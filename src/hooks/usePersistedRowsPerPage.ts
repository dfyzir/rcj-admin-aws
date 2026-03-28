import { useEffect, useState } from "react";

const DEFAULT_ROWS_PER_PAGE = 5;
const STORAGE_KEY = "rcj-admin-rows-per-page";

export function usePersistedRowsPerPage(
  fallback = DEFAULT_ROWS_PER_PAGE,
  storageKey = STORAGE_KEY
) {
  const [rowsPerPage, setRowsPerPage] = useState<number>(() => {
    if (typeof window === "undefined") {
      return fallback;
    }

    const storedValue = window.localStorage.getItem(storageKey);
    const parsedValue = storedValue ? Number(storedValue) : NaN;

    return Number.isFinite(parsedValue) && parsedValue > 0
      ? parsedValue
      : fallback;
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, String(rowsPerPage));
  }, [rowsPerPage, storageKey]);

  return [rowsPerPage, setRowsPerPage] as const;
}
