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
}

type SortDescriptor = {
  column: string;
  direction: "ascending" | "descending";
};

const ApplicationsTable = () => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "businessName",
    direction: "ascending",
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
      // List objects in the "applications/" folder.
      const listResponse = await client.send(
        new ListObjectsCommand({
          Bucket: config.aws_user_files_s3_bucket,
          Prefix: "applications/",
          Delimiter: "/",
        })
      );

      // Filter out folder placeholder objects.
      const fileObjects = (listResponse.Contents || []).filter(
        (obj) => obj.Key !== "applications/"
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

  // When a file is deleted, remove it from the state.
  const handleFileDeleted = useCallback((deletedPath: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.key !== deletedPath)
    );
  }, []);

  // Filter files based on search term.
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

  // Sorting logic: sort filtered files based on sortDescriptor.
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
  console.log("files", files);

  return (
    <div className="my-16 mx-auto container">
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
          <TableColumn onClick={() => handleSort("businessName")}>
            Business Name{renderSortArrow("businessName")}
          </TableColumn>
          <TableColumn
            className="hidden sm:table-cell"
            onClick={() => handleSort("formOfBusiness")}>
            Form of Business{renderSortArrow("formOfBusiness")}
          </TableColumn>
          <TableColumn
            className="hidden md:table-cell"
            onClick={() => handleSort("author")}>
            Submitted By{renderSortArrow("author")}
          </TableColumn>
          <TableColumn onClick={() => handleSort("submittedAt")}>
            Submitted At{renderSortArrow("submittedAt")}
          </TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody items={paginatedFiles} emptyContent="No files found.">
          {(file: FileMetadata) => {
            const submittedAt = file.lastModified
              ? format(new Date(file.lastModified), "PP")
              : "N/A";
            const author = file.metadata?.author || "N/A";
            const businessName = file.metadata?.businessname || "N/A";
            const formOfBusiness = file.metadata?.formofbusiness || "N/A";

            return (
              <TableRow key={file.id}>
                <TableCell>{businessName}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formOfBusiness}
                </TableCell>
                <TableCell className="hidden md:table-cell">{author}</TableCell>
                <TableCell>{submittedAt}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2 sm:gap-3">
                    <DeleteFileButton
                      filePath={file.key}
                      fileName={`${businessName} ${formOfBusiness} Application`}
                      onDelete={handleFileDeleted}
                    />
                    <ViewFileButton file={file} />
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
