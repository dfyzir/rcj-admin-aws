import { useCallback, useEffect, useMemo, useState } from "react";
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
import { parseKeyFallback } from "@/utils/stringMod";
import { useRouter } from "next/router";
import { generateClient } from "aws-amplify/api";
import { CreditApplicationsComments } from "@/API";
import { listCreditApplicationsComments } from "@/graphql/queries";
import { deleteCreditApplicationsComments } from "@/graphql/mutations";
import CommentButtonAWS from "./CommentsButton";
import AWSSubscriptionCreditApplications from "./CreditApplicationsSubscriptions";
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
  "grid grid-cols-[minmax(0,1fr)_7rem] gap-x-4 gap-y-3 px-6 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-default-500 md:grid-cols-[minmax(0,1fr)_minmax(9rem,0.85fr)_8.5rem] md:gap-x-6 md:text-sm md:tracking-[0.16em] xl:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)_minmax(0,0.8fr)_minmax(9rem,0.85fr)_8.5rem]";

const rowGridClassName =
  "grid grid-cols-[minmax(0,1fr)_7rem] items-center gap-x-4 gap-y-4 px-6 py-5 text-[1rem] leading-snug md:grid-cols-[minmax(0,1fr)_minmax(9rem,0.85fr)_8.5rem] md:gap-x-6 md:py-6 md:text-xl md:leading-normal xl:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)_minmax(0,0.8fr)_minmax(9rem,0.85fr)_8.5rem]";

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
  comments?: CreditApplicationsComments[];
}

type SortDescriptor = {
  column: string;
  direction: "ascending" | "descending";
};

const ApplicationsTable = () => {
  const { query } = useRouter();
  const rawKey = Array.isArray(query.key)
    ? query.key[0]
    : (query.key as string);
  const decoded = rawKey ? decodeURIComponent(rawKey) : "";
  const parts = decoded.split(".pdf");
  const s3Key = parts[0] + ".pdf";

  const [initialPreviewKey, setInitialPreviewKey] = useState<string | null>(
    null
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
      const listResponse = await client.send(
        new ListObjectsCommand({
          Bucket: config.aws_user_files_s3_bucket,
          Prefix: "applications/credit/",
          Delimiter: "/",
        })
      );

      const fileObjects = (listResponse.Contents || []).filter(
        (obj) => obj.Key !== "applications/credit/"
      );

      const fileMetadataPromises = fileObjects.map(async (file) => {
        const getObjectResponse = await client.send(
          new GetObjectCommand({
            Bucket: config.aws_user_files_s3_bucket,
            Key: file.Key!,
            Range: "bytes=0-0",
          })
        );

        return {
          id: file.Key!,
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

  useEffect(() => {
    fetchFilesAndMetadata();
  }, [fetchFilesAndMetadata]);

  const [applicationsComments, setApplicationsComments] = useState<
    CreditApplicationsComments[]
  >([]);

  const getApplicationsComments = useCallback(async () => {
    const client = generateClient();
    const allComments: any = await client.graphql({
      query: listCreditApplicationsComments,
    });
    const { data } = allComments;
    setApplicationsComments(data?.listCreditApplicationsComments?.items ?? []);
  }, []);

  useEffect(() => {
    getApplicationsComments();
  }, [getApplicationsComments]);

  const handleFileDeleted = useCallback(
    async (deletedPath: string) => {
      setFiles((prev) => prev.filter((file) => file.key !== deletedPath));

      const commentsToDelete = applicationsComments.filter(
        (c) => c.fileId === deletedPath
      );

      if (commentsToDelete.length) {
        const client = generateClient();

        await Promise.all(
          commentsToDelete.map((c) =>
            client.graphql({
              query: deleteCreditApplicationsComments,
              variables: { input: { id: c.id } },
            })
          )
        );
      }
    },
    [applicationsComments]
  );

  const filteredFiles = useMemo(() => {
    if (!filterValue.trim()) return files;
    const searchLower = filterValue.toLowerCase();
    return files.filter((file) => {
      const submittedAt = file.lastModified
        ? format(new Date(file.lastModified), "PPpp").toLowerCase()
        : "";
      const author = file.metadata?.author?.toLowerCase() || "";
      const businessName = file.metadata?.businessname?.toLowerCase() || "";
      const formOfBusiness = file.metadata?.formofbusiness?.toLowerCase() || "";
      return (
        submittedAt.includes(searchLower) ||
        author.includes(searchLower) ||
        businessName.includes(searchLower) ||
        formOfBusiness.includes(searchLower)
      );
    });
  }, [files, filterValue]);

  const sortedFiles = useMemo(() => {
    const sorted = [...filteredFiles];
    if (sortDescriptor.column) {
      sorted.sort((a, b) => {
        let aVal: string | number = "";
        let bVal: string | number = "";
        switch (sortDescriptor.column) {
          case "businessName":
            aVal = a.metadata?.businessname || "";
            bVal = b.metadata?.businessname || "";
            break;
          case "formOfBusiness":
            aVal = a.metadata?.formofbusiness || "";
            bVal = b.metadata?.formofbusiness || "";
            break;
          case "author":
            aVal = a.metadata?.author || "";
            bVal = b.metadata?.author || "";
            break;
          case "submittedAt":
            aVal = a.lastModified ? new Date(a.lastModified).getTime() : 0;
            bVal = b.lastModified ? new Date(b.lastModified).getTime() : 0;
            break;
          default:
            break;
        }
        if (aVal < bVal) {
          return sortDescriptor.direction === "ascending" ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortDescriptor.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredFiles, sortDescriptor]);

  const totalPages = Math.ceil(sortedFiles.length / rowsPerPage);

  const paginatedFiles = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedFiles.slice(start, start + rowsPerPage);
  }, [sortedFiles, page, rowsPerPage]);

  const handleSort = useCallback((column: string) => {
    setPage(1);
    setSortDescriptor((prev) => {
      if (prev.column === column) {
        return {
          column,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return { column, direction: "ascending" };
    });
  }, []);

  const renderSortArrow = (column: string) => {
    if (sortDescriptor.column !== column) {
      return null;
    }

    return (
      <span className="text-default-400">
        {sortDescriptor.direction === "ascending" ? "↑" : "↓"}
      </span>
    );
  };

  useEffect(() => {
    if (s3Key) {
      setInitialPreviewKey(s3Key);
    }
  }, [s3Key]);

  const itemsWithComments = useMemo(() => {
    return paginatedFiles.map((file) => ({
      ...file,
      comments: applicationsComments.filter(
        (comment) => comment?.fileId === file?.id
      ),
    }));
  }, [paginatedFiles, applicationsComments]);

  const { scrollRef, showTopShadow, showBottomShadow } =
    useTableScrollShadows("credit-applications", [
      itemsWithComments.length,
      page,
      rowsPerPage,
    ]);

  return (
    <div className={tablePageShellClassName}>
      <AWSSubscriptionCreditApplications
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
              onClick={() => handleSort("businessName")}>
              Business Name
              {renderSortArrow("businessName")}
            </button>
            <button
              className={`hidden xl:inline-flex ${sortableHeaderButtonClassName}`}
              type="button"
              onClick={() => handleSort("formOfBusiness")}>
              Form of Business
              {renderSortArrow("formOfBusiness")}
            </button>
            <button
              className={`hidden xl:inline-flex ${sortableHeaderButtonClassName}`}
              type="button"
              onClick={() => handleSort("author")}>
              Submitted By
              {renderSortArrow("author")}
            </button>
            <button
              className={`hidden md:inline-flex ${sortableHeaderButtonClassName}`}
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
                  let businessName = file.metadata?.businessname;
                  let formOfBusiness = file.metadata?.formofbusiness;
                  let author = file.metadata?.author;

                  if (!businessName || !formOfBusiness) {
                    const fallback = parseKeyFallback(file.key);
                    businessName =
                      businessName || fallback.businessName || "N/A";
                    formOfBusiness =
                      formOfBusiness || fallback.formOfBusiness || "N/A";
                  }

                  author = author || "N/A";
                  const isMatch = file.key === initialPreviewKey;

                  return (
                    <div
                      key={file.id}
                      className={`${rowGridClassName} ${
                        index % 2 === 1 ? stripedRowClassName : ""
                      } ${tableHoverRowClassName}`}>
                      <div className="min-w-0">
                        <div className="break-words">{businessName}</div>
                        <div className="mt-1 text-sm text-default-400 md:hidden">
                          {submittedAt}
                        </div>
                      </div>
                      <div className="hidden min-w-0 break-words xl:block">
                        {formOfBusiness}
                      </div>
                      <div className="hidden min-w-0 break-words xl:block">
                        {author}
                      </div>
                      <div className="hidden min-w-0 whitespace-nowrap md:block">
                        {submittedAt}
                      </div>
                      <div className="justify-self-end">
                        <div className="flex flex-row gap-2 sm:gap-3">
                          <DeleteFileButton
                            filePath={file.key}
                            fileName={`${businessName} ${formOfBusiness} Application`}
                            onDelete={handleFileDeleted}
                          />
                          <ViewFileButton file={file} autoOpen={isMatch} />
                          <CommentButtonAWS
                            comments={file.comments ?? []}
                            fileId={file.id}
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
