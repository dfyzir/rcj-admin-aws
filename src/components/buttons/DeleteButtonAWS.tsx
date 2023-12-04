import { generateClient } from "aws-amplify/api";
import { DeleteTrailerRCJMutation } from "@/API";
import { deleteTrailerRCJ } from "@/graphql/mutations";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ExpiredWarningIcon } from "../icons/ExpiredWarningIcon";

//DeleteButtonAWS Component:

//This component represents a button for deleting a trailer. It triggers a modal
//for confirming the deletion, and utilizes AWS Amplify for mutation
type DeleteButtonAWSProps = {
  id: string;
  chassisNumber: string;
};

const DeleteButtonAWS = ({ id, chassisNumber }: DeleteButtonAWSProps) => {
  // Use the useDisclosure hook to manage modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Object containing details required for deletion
  const deleteDetails = {
    id: id,
  };

  //Function: handleDeleteTrailer
  //Handles the deletion of the trailer by making a GraphQL mutation using AWS Amplify.

  const handleDeleteTrailer = async () => {
    const client = generateClient();
    await client.graphql<DeleteTrailerRCJMutation>({
      query: deleteTrailerRCJ,
      variables: { input: deleteDetails },
    });
  };

  return (
    <div>
      <Button
        isIconOnly
        variant="light"
        color="danger"
        title="Delete"
        onPress={onOpen}>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <div className="my-5">
              <ModalHeader className="flex gap-1 items-center text-4xl">
                Delete Trailer?
                <ExpiredWarningIcon color="red" />
              </ModalHeader>
              <ModalBody>
                <h1 className="text-2xl">
                  Do you want to delete{" "}
                  <span className="font-semibold text-red-500 text-3xl">
                    {chassisNumber}{" "}
                  </span>
                  permanetly?
                </h1>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-7">
                  <Button
                    color="danger"
                    variant="light"
                    className="text-2xl"
                    onPress={() => {
                      handleDeleteTrailer();

                      const timeoutID = setTimeout(() => {
                        onClose();
                      }, 1000);
                      return () => clearTimeout(timeoutID);
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

export default DeleteButtonAWS;
