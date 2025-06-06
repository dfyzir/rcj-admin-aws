import React, { useEffect, useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { getUrl, GetUrlWithPathInput } from "aws-amplify/storage";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ViewIcon } from "../icons/ViewIcon";
import { DownloadIcon } from "../icons/DownloadIcon";
import { useRouter } from "next/router";

// Define your FileMetadata type if not shared already
export interface FileMetadata {
  id: string;
  key: string;
  lastModified?: Date;
  metadata?: { [key: string]: string };
}
export interface ViewButtonProps {
  file: FileMetadata;
  autoOpen?: boolean;
}

const DynamicPDFViewer = dynamic(() => import("../pdfViewer/PDFViewer"), {
  ssr: false,
});

const ViewFileButton = ({ file, autoOpen }: ViewButtonProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fileUrl, setFileUrl] = useState<string>();

  const clearKeyQuery = () => {
    const { key, ...rest } = router.query;
    router.replace({ pathname: router.pathname, query: rest }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (autoOpen) {
      onOpen();
    }
  }, [autoOpen]);

  // Fetch a signed URL for the file using aws-amplify/storage's getUrl
  useEffect(() => {
    const fetchFileUrl = async () => {
      if (file.key) {
        try {
          const result = await getUrl({
            path: file.key,
          } as GetUrlWithPathInput);
          setFileUrl(result.url.href);
        } catch (error) {
          console.error("Error fetching file URL:", error);
        }
      }
    };
    fetchFileUrl();
  }, [file.key]);

  // Display a placeholder if no file URL is available (similar to EmptyDiv in your example)
  const EmptyDiv = useMemo(() => {
    return (
      <>
        {!fileUrl && (
          <div className="my-auto text-red-500 mx-auto p-5 h-auto items-center text-center text-xl md:text-4xl rounded-xl">
            No files to show
          </div>
        )}
      </>
    );
  }, [fileUrl]);

  return (
    <div className="container">
      <Button
        isIconOnly
        variant="light"
        color="secondary"
        title="Details"
        onPress={onOpen}>
        <ViewIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="5xl"
        scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="w-full h-full mt-5 sm:px-5 container not-italic">
                  <div className="text-2xl font-extralight italic text-foreground-600">
                    <p>
                      <span className="not-italic">Business Name:</span>{" "}
                      <span className="not-italic font-medium text-black dark:text-white ">
                        {file.metadata?.businessname || "No Business Name"}{" "}
                      </span>
                    </p>
                    <p>
                      <span className=" not-italic">Form of Business:</span>{" "}
                      <span className="font-medium text-black dark:text-white not-italic">
                        {file.metadata?.formofbusiness || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span className="not-italic">Submitted By:</span>{" "}
                      <span className="not-italic font-medium text-black dark:text-white">
                        {file.metadata?.author || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span className="not-italic">Submitted At:</span>{" "}
                      <span className="font-medium text-black dark:text-white not-italic">
                        {file.lastModified
                          ? format(
                              parseISO(
                                new Date(file.lastModified).toISOString()
                              ),
                              "PP"
                            )
                          : "N/A"}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-20 md:gap-10 mt-5 mx-auto">
                    {EmptyDiv}
                    {fileUrl && (
                      <div className="mx-auto">
                        <div className="flex justify-evenly">
                          <h3 className="text-center mb-4 text-xl font-semibold uppercase">
                            Credit Application
                          </h3>
                          <Link
                            href={fileUrl}
                            target="_blank"
                            aria-label="Download"
                            title="Download">
                            <DownloadIcon size={50} className="w-10 h-10" />
                          </Link>
                        </div>
                        <DynamicPDFViewer pdfUrl={fileUrl} />
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="my-5 mr-10 flex gap-5 items-center">
                  <Button
                    className="text-2xl"
                    variant="light"
                    color="danger"
                    onPress={() => {
                      onClose();
                      clearKeyQuery();
                    }}>
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ViewFileButton;
