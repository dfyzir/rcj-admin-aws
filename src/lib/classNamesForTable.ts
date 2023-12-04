/*This object provides class names for styling a table from NextUI. It includes classes for both
table header (th) and table data cells (td) to achieve a desired visual appearance.
The classes include styles for background, text color, borders, and row-specific styles.*/
export const classNamesForTable = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
  td: [
    "text-2xl",
    "py-5",
    "pb-10",
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
