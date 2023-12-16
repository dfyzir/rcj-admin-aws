import { format, parseISO } from "date-fns";
import { ChassisLocation } from "@/API";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ViewIcon } from "../../icons/ViewIcon";
import EditButtonAWS from "./EditButtonAWS";

/*ViewButtonAWS Component:
 
 This component represents a button that, when clicked, opens a modal displaying details
 of a trailer. It includes information such as chassis number, VIN, plate number, and
 file attachments for inspection and registration. Users can view PDF files, download
 attachments, and access actions like editing and generating a QR code for the trailer.*/

type ViewButtonAWSProps = {
  location: ChassisLocation;
};

const ViewButtonAWS = ({ location }: ViewButtonAWSProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="md:hidden">
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
                <div className="w-full h-full mt-5 sm:px-5 container">
                  <div className="flex flex-row items-center justify-between">
                    <h1 className="pt-8 font-semibold tracking-wider text-5xl mb-5">
                      {location.chassisNumber}{" "}
                      <span className="text-lg italic tracking-normal font-light align-text-bottom">
                        last update at{" "}
                        {format(parseISO(location.updatedAt), "PPpp")}
                      </span>
                    </h1>
                  </div>

                  <div className="text-2xl font-extralight italic text-foreground-600">
                    <p>
                      Location:{" "}
                      <span className="underline underline-offset-2 font-medium text-zinc-700/70 tracking-wide">
                        {location.location}
                      </span>
                    </p>
                    <p>
                      Container:{" "}
                      <span className="underline underline-offset-2 font-medium text-zinc-700/70 tracking-wide">
                        {location.container ? location.container : "N/A"}
                      </span>
                    </p>
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
                  <EditButtonAWS location={location} isView={true} />
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
