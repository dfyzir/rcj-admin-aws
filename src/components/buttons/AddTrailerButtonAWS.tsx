import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon";
import TrailerRCJCreateForm from "@/ui-components/TrailerRCJCreateForm";

const AddTrailerButtonAWS = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const processFile = ({ file, key }: { file: File; key: string }) => {
    const fileParts = key.split(".");
    const ext = fileParts.pop();
    return {
      file,
      // This will prepend a unix timestamp
      // to ensure all files uploaded are unique
      key: `${fileParts.join(".").toUpperCase()}.${ext}`,
    };
  };

  return (
    <div className="container">
      <Button
        className="text-xl"
        size="lg"
        color="primary"
        endContent={<PlusIcon />}
        onPress={onOpen}>
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="5xl"
        scrollBehavior="inside">
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader>Create new trailer</ModalHeader>
              <ModalBody>
                <TrailerRCJCreateForm
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

export default AddTrailerButtonAWS;
