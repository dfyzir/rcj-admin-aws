import { useEffect, useMemo, useState } from "react";
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
import QrCodeButton from "./QRCodeButton";
import { useCheckDate } from "@/hooks/useCheckDate";

/*ViewButtonAWS Component:
 
 This component represents a button that, when clicked, opens a modal displaying details
 of a trailer. It includes information such as chassis number, VIN, plate number, and
 file attachments for inspection and registration. Users can view PDF files, download
 attachments, and access actions like editing and generating a QR code for the trailer.*/

const DynamicPDFViewer = dynamic(() => import("../pdfViewer/PDFViewer"), {
  ssr: false,
});

type ViewButtonAWSProps = {
  trailer: TrailerRCJ;
};

const ViewButtonAWS = ({ trailer }: ViewButtonAWSProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inspectionUrl, setInspectionUrl] = useState<string>();
  const [registrationUrl, setRegistrationUrl] = useState<string>();
  const { isExpired } = useCheckDate();

  //Getting signed links for pdf files from storage
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
  //EmptyDiv is used when no files in storage for current chassis
  const EmptyDiv = useMemo(() => {
    return (
      <>
        {!inspectionUrl && !registrationUrl && (
          <div className="my-auto  text-red-500 mx-auto p-5 h-auto items-center text-center text-xl md:text-4xl rounded-xl">
            No files to show
          </div>
        )}
      </>
    );
  }, [inspectionUrl, registrationUrl]);

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
                    {EmptyDiv}
                    {inspectionUrl && (
                      <div className=" mx-auto">
                        <div className="flex justify-evenly">
                          <h3 className="text-center mb-4 text-xl font-semibold uppercase">
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
                        {trailer.inspectionExpiresAt ? (
                          <h3
                            className={`text-center mt-4 text-xl font-semibold ${
                              isExpired(trailer.inspectionExpiresAt)
                                ? "text-red-500"
                                : null
                            }`}>
                            {isExpired(trailer.inspectionExpiresAt!)
                              ? "Expired"
                              : `Expires on ${format(
                                  parseISO(trailer.inspectionExpiresAt),
                                  "PP"
                                )}`}
                          </h3>
                        ) : null}
                      </div>
                    )}
                    {registrationUrl && (
                      <div className=" mx-auto ">
                        <div className="flex justify-evenly">
                          <h3 className="text-center mb-4 text-xl font-semibold uppercase">
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
                          {trailer.registrationExpiresAt ? (
                            <h3 className="text-center mt-4 text-xl font-semibold">
                              {isExpired(trailer.registrationExpiresAt!)
                                ? "Expired"
                                : `Expires on ${format(
                                    parseISO(trailer.registrationExpiresAt),
                                    "PP"
                                  )}`}
                            </h3>
                          ) : null}
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
                  <QrCodeButton text={trailer.chassisNumber as string} />
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
