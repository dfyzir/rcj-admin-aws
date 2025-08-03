import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  ListObjectsCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import config from "@/amplifyconfiguration.json";
import { format } from "date-fns";
import BottomContent from "@/components/chassisTable/TablePagination";
import TopContent from "./TableSearch";
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

const classNames = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
  td: [
    "text-xl",
    "py-7",
    "px-1",
    "group-data-[first=true]:first:before:rounded-none",
    "group-data-[first=true]:last:before:rounded-none",
    "group-data-[middle=true]:before:rounded-none",
    "group-data-[last=true]:first:before:rounded-none",
    "group-data-[last=true]:last:before:rounded-none",
  ],
};

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
    null
  );
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "submitedAt",
    direction: "descending",
  });

  const fetchFilesAndMetadata = useCallback(async () => {
    const client = new S3Client({
      region: config.aws_project_region,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: config.aws_cognito_region },
        identityPoolId: config.aws_cognito_identity_pool_id,
      }),
    });

    try {
      // List objects in the "applications/drivers/" folder.
      const listResponse = await client.send(
        new ListObjectsCommand({
          Bucket: config.aws_user_files_s3_bucket,
          Prefix: "applications/drivers/",
          Delimiter: "/",
        })
      );

      // Filter out folder placeholder objects.
      const fileObjects = (listResponse.Contents || []).filter(
        (obj) => obj.Key !== "applications/drivers/"
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
        (c) => c.fileId === deletedPath
      );

      if (commentsToDelete.length) {
        const client = generateClient();

        // 3) Delete them in parallel against AppSync
        await Promise.all(
          commentsToDelete.map((c) =>
            client.graphql({
              query: deleteDriverApplicationsComments,
              variables: { input: { id: c.id } },
            })
          )
        );
      }
    },
    // now depends on applicationsComments & setApplicationsComments
    [applicationsComments]
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
        (comment) => comment?.fileId === file?.id
      ),
    }));
  }, [paginatedFiles, applicationsComments]);

  return (
    <div className="my-16 mx-auto container">
      <AWSSubscriptionDriverApplications
        setComments={setApplicationsComments}
        setFilterValue={setFilterValue}
      />
      <Table
        aria-label="Files Metadata Table"
        classNames={classNames}
        topContent={
          <TopContent
            files={files}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
          />
        }
        bottomContent={
          <BottomContent page={page} pages={totalPages} setPage={setPage} />
        }
        isStriped>
        <TableHeader>
          <TableColumn onClick={() => handleSort("firstName")}>
            First Name{renderSortArrow("firstName")}
          </TableColumn>
          <TableColumn onClick={() => handleSort("lastName")}>
            Last Name{renderSortArrow("lastName")}
          </TableColumn>
          <TableColumn
            className="hidden sm:table-cell"
            onClick={() => handleSort("submittedAt")}>
            Submitted At{renderSortArrow("submittedAt")}
          </TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody items={itemsWithComments} emptyContent="No files found.">
          {(file: FileMetadata) => {
            const submittedAt = file.lastModified
              ? format(new Date(file.lastModified), "PP")
              : "N/A";
            let firstName = file.metadata?.firstname;
            let lastName = file.metadata?.lastName;
            if (!firstName || !lastName) {
              const fallback = parseKeyFallbackForDriversApplications(file.key);
              firstName = firstName || fallback.firstName || "N/A";
              lastName = lastName || fallback.lastName || "N/A";
            }
            const isMatch = file.key === initialPreviewKey;

            return (
              <TableRow key={file.id}>
                <TableCell className="!pl-4">{firstName}</TableCell>
                <TableCell className="!pl-4">{lastName}</TableCell>
                <TableCell className="!pl-4 hidden sm:table-cell">
                  {submittedAt}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationsTable;
