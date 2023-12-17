import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../../icons/PlusIcon";
import ChassisLoctionCreateForm from "@/ui-components/ChassisLocationCreateForm";
import { v4 as uuidv4 } from "uuid";

//AddTrailerButtonAWS Component:

//This component represents a button to add a new trailer, triggering the display of a modal
//with a form for creating a new trailer using TRailerRCJCreateForm  AWS UI component. It uses NextUI components and AWS services.

const AddLocationButtonAWS = () => {
  // Use the useDisclosure hook to manage modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //processFile processes and formats file data before submission.

  return (
    <div className="container">
      <Button
        className="text-xl"
        size="lg"
        color="primary"
        endContent={<PlusIcon />}
        onPress={onOpen}>
        Add
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
              <ModalBody className="">
                <ChassisLoctionCreateForm
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

export default AddLocationButtonAWS;
