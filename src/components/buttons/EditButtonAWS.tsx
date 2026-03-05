import { remove } from "aws-amplify/storage";
import { TrailerRCJ } from "@/API";
import { useTheme } from "@aws-amplify/ui-react";
import { v4 as uuidv4 } from "uuid";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";

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
  const { tokens } = useTheme();

  // Function for processing file during form submission
  const processFile = ({ file, key }: { file: File; key: string }) => {
    const fileParts = key.split(".");
    const ext = fileParts.pop();
    const uniqueString = uuidv4().replace(/-/g, "").substring(0, 5);
    return {
      file,
      key: `${fileParts.join(".").toUpperCase()}.${uniqueString}.${ext}`,
    };
  };

  const removeStorageFile = async (filePath: string) => {
    if (!filePath) return;
    try {
      await remove({ path: filePath });
      return;
    } catch (err) {
      // Some legacy records are stored without the public/ prefix.
      if (!filePath.startsWith("public/")) {
        try {
          await remove({ path: `public/${filePath}` });
          return;
        } catch (fallbackErr) {
          console.warn("Failed to delete storage file:", fallbackErr);
          return;
        }
      }
      console.warn("Failed to delete storage file:", err);
    }
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
              <ModalBody>
                <div className="pl-0">
                  <TrailerRCJUpdateForm
                    trailerRCJ={trailer}
                    onSuccess={onClose}
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
                      if (
                        trailer.inspectionFile &&
                        trailer.inspectionFile !== updatedFields.inspectionFile
                      ) {
                        void removeStorageFile(trailer.inspectionFile);
                      }
                      if (
                        trailer.registrationFile &&
                        trailer.registrationFile !==
                          updatedFields.registrationFile
                      ) {
                        void removeStorageFile(trailer.registrationFile);
                      }
                      return updatedFields;
                    }}
                    overrides={{
                      inspectionFile: { processFile },
                      registrationFile: { processFile },
                      SubmitButton: {
                        className:
                          "dark:!bg-[#047d95] dark:hover:!bg-[#7dd6e8] dark:hover:!text-[#047d95]",
                      },
                      CancelButton: {
                        onClick: onClose,
                        className:
                          "dark:!bg-[#bf4040] dark:hover:!bg-[#ef8f8f] dark:hover:!text-[#bf4040]",
                      },
                      ResetButton: {
                        className:
                          "dark:!text-white dark:!bg-gray-900 dark:hover:!bg-gray-600 dark:!border-gray-950 dark:hover:!text-gray-900",
                      },
                    }}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditButtonAWS;
