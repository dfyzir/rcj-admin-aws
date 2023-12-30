import { ChassisLocation } from "@/API";
import { useTheme } from "@aws-amplify/ui-react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { EditIcon } from "../../icons/EditIcon";
import ChassisLocationUpdateForm from "@/ui-components/ChassisLocationUpdateForm";

//EditButtonAWS Component:

//This component represents a button for editing a trailer. It triggers a modal
//for updating the trailer details and utilizes AWS Amplify for storage operations.

type EditButtonAWSProps = {
  location: ChassisLocation;
  isView: boolean;
};

const EditButtonAWS = ({ location, isView }: EditButtonAWSProps) => {
  // Use the useDisclosure hook to manage modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { tokens } = useTheme();

  return (
    <div
      className={` ${isView ? "flex md:hidden" : ""} ${
        !isView ? "hidden md:flex" : ""
      }`}>
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
              <ModalHeader>Update chassis location</ModalHeader>
              <ModalBody>
                <div className="pl-0">
                  <ChassisLocationUpdateForm
                    onSuccess={onClose}
                    chassisLocation={location}
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
                      return updatedFields;
                    }}
                    overrides={{
                      chassisNumber: {
                        isDisabled: true,
                      },
                      location: {
                        value: location.location!,
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
