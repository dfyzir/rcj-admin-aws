import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  ListObjectsCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import config from "@/amplifyconfiguration.json";
import { format } from "date-fns";
import BottomContent from "@/components/chassisTable/TablePagination";
import TopContent from "./TableSearch";
import CollapsibleTableControls from "@/components/common/CollapsibleTableControls";
import ViewFileButton from "./ViewFileButton";
import DeleteFileButton from "./DeleteFileButton";
import { parseKeyFallbackForDriversApplications } from "@/utils/stringMod";
import { useRouter } from "next/router";
import { generateClient } from "aws-amplify/api";
import { listDriverApplicationsComments } from "@/graphql/queries";
import CommentButtonAWS from "./CommentsButton";
import { DriverApplicationsComments } from "@/API";
import AWSSubscriptionDriverApplications from "./DriverApplicationsSubscriptions";
import { deleteDriverApplicationsComments } from "@/graphql/mutations";
import { fetchAuthSession } from "aws-amplify/auth";
import { usePersistedRowsPerPage } from "@/hooks/usePersistedRowsPerPage";
import { useTableScrollShadows } from "@/hooks/useTableScrollShadows";
import {
  tableHoverRowClassName,
  tablePageShellClassName,
  tableScrollFrameClassName,
  tableScrollRegionClassName,
} from "@/lib/tableShell";

const headerGridClassName =
  "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8.5rem] gap-x-4 gap-y-3 px-6 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-default-500 md:text-sm md:tracking-[0.16em] md:gap-x-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(9rem,0.85fr)_8.5rem]";

const rowGridClassName =
  "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8.5rem] items-center gap-x-4 gap-y-4 px-6 py-5 text-[1rem] leading-snug md:gap-x-6 md:py-6 md:text-xl md:leading-normal lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(9rem,0.85fr)_8.5rem]";

const shadowOverlayClassName =
  "pointer-events-none absolute inset-x-0 inset-y-0 z-10";

const stripedRowClassName = "bg-slate-100/95 dark:bg-slate-900/60";

const topShadowClassName =
  "absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-200 ease-out dark:from-white/25";

const bottomShadowClassName =
  "absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/45 to-transparent transition-opacity duration-200 ease-out dark:from-white/25";

const sortableHeaderButtonClassName =
  "inline-flex items-center gap-2 text-left text-sm font-semibold uppercase tracking-[0.16em] text-default-500 transition-colors hover:text-foreground";

interface FileMetadata {
  id: string;
  key: string;
  lastModified?: Date;
  metadata?: { [key: string]: string };
  comments?: DriverApplicationsComments[];
}

type SortDescriptor = {
  column: string;
  direction: "ascending" | "descending";
};

const ApplicationsTable = () => {
  const { query } = useRouter();
  // router.query.key will be the *once*-decoded* value
  // i.e. "applications%2Fdrivers%2Ftest.pdf"
  const rawKey = Array.isArray(query.key)
    ? query.key[0]
    : (query.key as string);
  const decoded = rawKey ? decodeURIComponent(rawKey) : "";
  const parts = decoded.split(".pdf");
  const s3Key = parts[0] + ".pdf";

  const [initialPreviewKey, setInitialPreviewKey] = useState<string | null>(
    null,
  );
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = usePersistedRowsPerPage();
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "submittedAt",
    direction: "descending",
  });

  const fetchFilesAndMetadata = useCallback(async () => {
    const session = await fetchAuthSession();
    if (!session.credentials) {
      throw new Error("Missing authenticated credentials for S3 access");
    }

    const client = new S3Client({
      region: config.aws_project_region,
      credentials: session.credentials,
    });

    try {
      // List objects in the "applications/drivers/" folder.
      const listResponse = await client.send(
        new ListObjectsCommand({
          Bucket: config.aws_user_files_s3_bucket,
          Prefix: "applications/drivers/",
          Delimiter: "/",
        }),
      );

      // Filter out folder placeholder objects.
      const fileObjects = (listResponse.Contents || []).filter(
        (obj) => obj.Key !== "applications/drivers/",
      );

      const fileMetadataPromises = fileObjects.map(async (file) => {
        const getObjectResponse = await client.send(
          new GetObjectCommand({
            Bucket: config.aws_user_files_s3_bucket,
            Key: file.Key!,
            Range: "bytes=0-0",
          }),
        );

        return {
          id: file.Key!, // using file key as unique identifier
          key: file.Key!,
          lastModified: file.LastModified,
          metadata: getObjectResponse.Metadata,
        };
      });

      const filesWithMetadata = await Promise.all(fileMetadataPromises);
      setFiles(filesWithMetadata);
    } catch (error) {
      console.error("Error fetching files and metadata:", error);
    }
  }, []);

  // Initially fetch files on mount and optionally refetch when needed.
  useEffect(() => {
    fetchFilesAndMetadata();
  }, [fetchFilesAndMetadata]);

  const [applicationsComments, setApplicationsComments] = useState<
    DriverApplicationsComments[]
  >([]);

  const getApplicationsComments = useCallback(async () => {
    // Fetch trailers on component mount using GrapQL API

    const client = generateClient();
    const allComments: any = await client.graphql({
      query: listDriverApplicationsComments,
    });
    const { data } = allComments;
    setApplicationsComments(data?.listDriverApplicationsComments?.items ?? []);
  }, []);

  useEffect(() => {
    getApplicationsComments();
  }, [getApplicationsComments]);

  const handleFileDeleted = useCallback(
    async (deletedPath: string) => {
      // 1) Drop file from UI
      setFiles((prev) => prev.filter((file) => file.key !== deletedPath));

      // 2) Find all comments for that file
      const commentsToDelete = applicationsComments.filter(
        (c) => c.fileId === deletedPath,
      );

      if (commentsToDelete.length) {
        const client = generateClient();

        // 3) Delete them in parallel against AppSync
        await Promise.all(
          commentsToDelete.map((c) =>
            client.graphql({
              query: deleteDriverApplicationsComments,
              variables: { input: { id: c.id } },
            }),
          ),
        );
      }
    },
    // now depends on applicationsComments & setApplicationsComments
    [applicationsComments],
  );
  // Filter files based on search term.
  const filteredFiles = useMemo(() => {
    if (!filterValue.trim()) return files;
    const searchLower = filterValue.toLowerCase();
    return files.filter((file) => {
      const submittedAt = file.lastModified
        ? format(new Date(file.lastModified), "PPpp").toLowerCase()
        : "";
      let firstName = file.metadata?.firstname?.toLowerCase();
      let lastName = file.metadata?.lastname?.toLowerCase();
      if (!firstName) {
        const fallback = parseKeyFallbackForDriversApplications(file.key);
        firstName = fallback.firstName?.toLowerCase() || "N/A";
      }
      if (!lastName) {
        const fallback = parseKeyFallbackForDriversApplications(file.key);
        lastName = fallback.lastName?.toLowerCase() || "N/A";
      }
      return (
        submittedAt.includes(searchLower) ||
        firstName.includes(searchLower) ||
        lastName.includes(searchLower)
      );
    });
  }, [files, filterValue]);

  // Sorting logic: sort filtered files based on sortDescriptor.
  const sortedFiles = useMemo(() => {
    const sorted = [...filteredFiles];
    if (sortDescriptor.column) {
      sorted.sort((a, b) => {
        let aVal: string | number = "";
        let bVal: string | number = "";
        switch (sortDescriptor.column) {
          case "firstName":
            aVal = a.metadata?.firstname?.toLowerCase() || "";
            bVal = b.metadata?.firstname?.toLowerCase() || "";
            break;
          case "lastName":
            aVal = a.metadata?.lastname?.toLowerCase() || "";
            bVal = b.metadata?.lastname?.toLowerCase() || "";
            break;
          case "submittedAt":
            aVal = a.lastModified ? new Date(a.lastModified).getTime() : 0;
            bVal = b.lastModified ? new Date(b.lastModified).getTime() : 0;
            break;
          default:
            break;
        }
        if (aVal < bVal)
          return sortDescriptor.direction === "ascending" ? -1 : 1;
        if (aVal > bVal)
          return sortDescriptor.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredFiles, sortDescriptor]);

  // Pagination logic.
  const totalPages = Math.ceil(sortedFiles.length / rowsPerPage);
  const paginatedFiles = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedFiles.slice(start, start + rowsPerPage);
  }, [sortedFiles, page, rowsPerPage]);

  // Handle sorting when clicking on a column header.
  const handleSort = useCallback((column: string) => {
    setPage(1);
    setSortDescriptor((prev) => {
      if (prev.column === column) {
        // Toggle direction.
        return {
          column,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      } else {
        // New column, default ascending.
        return { column, direction: "ascending" };
      }
    });
  }, []);

  // Render a sort arrow if the column is being sorted.
  const renderSortArrow = (column: string) => {
    if (sortDescriptor.column !== column) return null;
    return sortDescriptor.direction === "ascending" ? " ▲" : " ▼";
  };

  useEffect(() => {
    // once we have our query param, and after mount, trigger initial preview
    if (s3Key) {
      setInitialPreviewKey(s3Key);
    }
  }, [s3Key]);
  const itemsWithComments = useMemo(() => {
    return paginatedFiles.map((file) => ({
      ...file,
      comments: applicationsComments.filter(
        (comment) => comment?.fileId === file?.id,
      ),
    }));
  }, [paginatedFiles, applicationsComments]);
  const { scrollRef, showTopShadow, showBottomShadow } =
    useTableScrollShadows("driver-applications", [
      itemsWithComments.length,
      page,
      rowsPerPage,
    ]);

  return (
    <div className={tablePageShellClassName}>
      <AWSSubscriptionDriverApplications
        setComments={setApplicationsComments}
      />
      <CollapsibleTableControls>
        <TopContent
          files={files}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </CollapsibleTableControls>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className={`${tableScrollFrameClassName} flex min-h-0 flex-col`}>
        <div className="shrink-0 border-b border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-950">
          <div className={headerGridClassName}>
            <button
              className={sortableHeaderButtonClassName}
              type="button"
              onClick={() => handleSort("firstName")}>
              First Name
              {renderSortArrow("firstName")}
            </button>
            <button
              className={sortableHeaderButtonClassName}
              type="button"
              onClick={() => handleSort("lastName")}>
              Last Name
              {renderSortArrow("lastName")}
            </button>
            <button
              className={`hidden lg:inline-flex ${sortableHeaderButtonClassName}`}
              type="button"
              onClick={() => handleSort("submittedAt")}>
              Submitted At
              {renderSortArrow("submittedAt")}
            </button>
            <div className="justify-self-end">Actions</div>
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={scrollRef} className={tableScrollRegionClassName}>
            {itemsWithComments.length === 0 ? (
              <div className="flex min-h-full items-center justify-center px-6 py-16 text-lg text-default-400">
                No files found.
              </div>
            ) : (
              <div className="min-h-full">
                {itemsWithComments.map((file, index) => {
                  const submittedAt = file.lastModified
                    ? format(new Date(file.lastModified), "PP")
                    : "N/A";
                  let firstName = file.metadata?.firstname;
                  let lastName = file.metadata?.lastName;

                  if (!firstName || !lastName) {
                    const fallback = parseKeyFallbackForDriversApplications(
                      file.key
                    );
                    firstName = firstName || fallback.firstName || "N/A";
                    lastName = lastName || fallback.lastName || "N/A";
                  }

                  const isMatch = file.key === initialPreviewKey;

                  return (
                    <div
                      key={file.id}
                      className={`${rowGridClassName} ${
                        index % 2 === 1 ? stripedRowClassName : ""
                      } ${tableHoverRowClassName}`}>
                      <div className="min-w-0 break-words">{firstName}</div>
                      <div className="min-w-0 break-words">
                        {lastName}
                        <div className="mt-1 text-sm text-default-400 lg:hidden">
                          {submittedAt}
                        </div>
                      </div>
                      <div className="hidden min-w-0 whitespace-nowrap lg:block">
                        {submittedAt}
                      </div>
                      <div className="justify-self-end">
                        <div className="flex flex-row gap-2 sm:gap-3">
                          <DeleteFileButton
                            filePath={file.key}
                            fileName={`${firstName} ${lastName} Application`}
                            onDelete={handleFileDeleted}
                          />
                          <ViewFileButton file={file} autoOpen={isMatch} />
                          <CommentButtonAWS
                            fileId={file.id}
                            comments={file.comments ?? []}
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
          <BottomContent page={page} pages={totalPages} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTable;
