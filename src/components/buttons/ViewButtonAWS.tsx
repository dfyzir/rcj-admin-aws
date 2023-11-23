import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { getUrl } from "aws-amplify/storage";
import { TrailerRCJ } from "@/API";

import Link from "next/link";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { DownloadIcon } from "../icons/DownloadIcon";
import { ViewIcon } from "../icons/ViewIcon";
import EditButtonAWS from "./EditButtonAWS";

import dynamic from "next/dynamic";

const DynamicPDFViewer = dynamic(() => import("../PDFViewer"), {
  ssr: false,
});

const ViewButtonAWS = ({ trailer }: { trailer: TrailerRCJ }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inspectionUrl, setInspectionUrl] = useState<string>();
  const [registrationUrl, setRegistrationUrl] = useState<string>();

  useEffect(() => {
    const getSignedLinks = async () => {
      const inspectionLink = trailer.inspectionFile
        ? await getUrl({ key: trailer.inspectionFile })
        : null;

      const registrationLink = trailer.registrationFile
        ? await getUrl({ key: trailer.registrationFile })
        : null;

      inspectionLink ? setInspectionUrl(inspectionLink.url.href) : null;

      registrationLink ? setRegistrationUrl(registrationLink.url.href) : null;
    };
    getSignedLinks();
  }, [trailer.inspectionFile, trailer.registrationFile]);

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
        scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="px-5 w-full h-full mt-5 container">
                  <div className="flex flex-row items-center justify-between">
                    <h1 className="pt-8 font-semibold tracking-wider text-5xl mb-5">
                      {trailer.chassisNumber}{" "}
                      <span className="text-lg italic tracking-normal font-light align-text-bottom">
                        last update at{" "}
                        {format(parseISO(trailer.updatedAt), "PP")}
                      </span>
                    </h1>
                  </div>

                  <div className="text-2xl font-extralight italic text-foreground-600">
                    <p>
                      VIN:{" "}
                      <span className="underline underline-offset-2 font-medium text-zinc-700/70 tracking-wide">
                        {trailer.vinNumber}
                      </span>
                    </p>
                    <p>
                      Plate number:{" "}
                      <span className="underline underline-offset-2 font-medium text-zinc-700/70 tracking-wide">
                        {trailer.plateNumber}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-20 md:gap-10 mt-5 mx-auto">
                    {!inspectionUrl && !registrationUrl && (
                      <div className="my-auto flex shadow-lg bg-gradient-to-t from-red-600 to-red-500/70 mx-auto p-5 h-auto items-center text-center text-4xl rounded-xl text-white">
                        This chassis does not have files to show
                      </div>
                    )}
                    {inspectionUrl && (
                      <div className=" mx-auto">
                        <div className="flex justify-evenly">
                          <h3 className="text-center mb-4 text-xl font-semibold">
                            Inspection
                          </h3>
                          <Link
                            href={inspectionUrl}
                            target="_blank"
                            aria-label="Download"
                            title="Download">
                            <DownloadIcon size={50} className="w-10 h-10" />
                          </Link>
                        </div>
                        <DynamicPDFViewer pdfUrl={inspectionUrl} />
                        <h3 className="text-center mt-4 text-xl font-semibold">
                          Expires on{" "}
                          {trailer.inspectionExpiresAt
                            ? format(
                                parseISO(trailer.inspectionExpiresAt),
                                "PP"
                              )
                            : null}
                        </h3>
                      </div>
                    )}
                    {registrationUrl && (
                      <div className=" mx-auto ">
                        <div className="flex justify-evenly">
                          <h3 className="text-center mb-4 text-xl font-semibold">
                            Registration
                          </h3>
                          <Link
                            href={registrationUrl}
                            target="_blank"
                            aria-label="Download"
                            title="Download">
                            <DownloadIcon size={50} className="w-10 h-10" />
                          </Link>
                        </div>
                        <div className="w-full h-full rounded-xl">
                          <DynamicPDFViewer pdfUrl={registrationUrl} />
                          <h3 className="text-center mt-4 text-xl font-semibold">
                            Expires on{" "}
                            {trailer.registrationExpiresAt
                              ? format(
                                  parseISO(trailer.registrationExpiresAt),
                                  "PP"
                                )
                              : null}
                          </h3>
                        </div>
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
                    onPress={onClose}>
                    Close
                  </Button>
                  <EditButtonAWS trailer={trailer} isView={true} />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default ViewButtonAWS;
