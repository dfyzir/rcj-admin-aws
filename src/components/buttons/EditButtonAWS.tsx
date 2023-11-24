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

const EditButtonAWS = ({
  trailer,
  isView,
}: {
  trailer: TrailerRCJ;
  isView: boolean;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
