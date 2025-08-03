import React from "react";
import { remove } from "aws-amplify/storage";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/DeleteIcon";

type DeleteFileButtonProps = {
  filePath: string;
  fileName?: string;
  onDelete?: (filePath: string) => void;
};

const DeleteFileButton: React.FC<DeleteFileButtonProps> = ({
  filePath,
  fileName,
  onDelete,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = async () => {
    try {
      await remove({
        path: filePath,
      }).then(() => {
        if (onDelete) {
          onDelete(filePath);
        }
      });
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      <Button
        isIconOnly
        variant="light"
        color="danger"
        title="Delete File"
        onPress={onOpen}>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <div className="my-5">
              <ModalHeader className="flex gap-1 items-center text-4xl">
                Delete File?
              </ModalHeader>
              <ModalBody>
                <h1 className="text-2xl">
                  Do you want to delete{" "}
                  <span className="font-semibold text-red-500 text-3xl">
                    {fileName || filePath}
                  </span>{" "}
                  permanently?
                </h1>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-7">
                  <Button
                    color="danger"
                    variant="light"
                    className="text-2xl"
                    onPress={() => {
                      handleDelete();
                      setTimeout(() => {
                        onClose();
                      }, 1000);
                    }}>
                    Delete
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    className="text-2xl">
                    Cancel
                  </Button>
                </div>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteFileButton;
