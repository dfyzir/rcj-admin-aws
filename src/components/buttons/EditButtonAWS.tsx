import { remove } from "aws-amplify/storage";
import { TrailerRCJ } from "@/API";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { EditIcon } from "../icons/EditIcon";
import TrailerRCJUpdateForm from "@/ui-components/TrailerRCJUpdateForm";

//EditButtonAWS Component:

//This component represents a button for editing a trailer. It triggers a modal
//for updating the trailer details and utilizes AWS Amplify for storage operations.

type EditButtonAWSProps = {
  trailer: TrailerRCJ;
  isView: boolean;
};

const EditButtonAWS = ({ trailer, isView }: EditButtonAWSProps) => {
  // Use the useDisclosure hook to manage modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Function for processing file during form submission
  const processFile = ({ file, key }: { file: File; key: string }) => {
    const fileParts = key.split(".");
    const ext = fileParts.pop();

    return {
      file,
      key: `${fileParts.join(".").toUpperCase()}.${ext}`,
    };
  };

  return (
    <div className="container">
      <Button
        className="text-2xl"
        isIconOnly={!isView}
        variant="light"
        color="primary"
        title="Edit"
        onPress={onOpen}>
        {isView ? "Edit" : <EditIcon />}
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
              <ModalHeader>Update trailer</ModalHeader>
              <ModalBody className="container">
                <TrailerRCJUpdateForm
                  trailerRCJ={trailer}
                  onSubmit={(fields: any) => {
                    const updatedFields: any = {};
                    //override built in submit functionality:
                    //capitalize chassisNumber, VIN, plateNumber
                    Object.keys(fields).forEach((key) => {
                      if (
                        typeof fields[key] === "string" &&
                        key !== "inspectionFile" &&
                        key !== "registrationFile"
                      ) {
                        updatedFields[key] = fields[key].trim().toUpperCase();
                      } else {
                        updatedFields[key] = fields[key];
                      }
                    });
                    //if updatedFiles dont match previous files - delete previous files from storage
                    trailer.inspectionFile &&
                    trailer.inspectionFile !== updatedFields.inspectionFile
                      ? remove({ key: trailer.inspectionFile })
                      : null;
                    trailer.registrationFile &&
                    trailer.registrationFile !== updatedFields.registrationFile
                      ? remove({ key: trailer.registrationFile })
                      : null;
                    return updatedFields;
                  }}
                  overrides={{
                    inspectionFile: { processFile },
                    registrationFile: { processFile },

                    SubmitButton: {
                      onClick: () => {
                        const timeoutId = setTimeout(() => {
                          onClose();
                        }, 1000);
                        return () => clearTimeout(timeoutId);
                      },
                    },
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditButtonAWS;
