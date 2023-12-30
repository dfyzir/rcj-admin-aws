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
import useScreenWidth from "@/hooks/useScreenWidth";
import { useState } from "react";
import { ChassisLocation } from "@/API";
import { generateClient } from "aws-amplify/api";
import { listChassisLocations } from "@/graphql/queries";
import { set } from "date-fns";

//AddTrailerButtonAWS Component:

//This component represents a button to add a new trailer, triggering the display of a modal
//with a form for creating a new trailer using TRailerRCJCreateForm  AWS UI component. It uses NextUI components and AWS services.

const AddLocationButtonAWS = () => {
  const [inventory, setInventory] = useState<ChassisLocation>();
  const [hasMatch, setHasMatch] = useState(false);
  // Use the useDisclosure hook to manage modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const screenWidth = useScreenWidth();

  //processFile processes and formats file data before submission.
  return (
    <div className="container">
      <Button
        className="text-xl"
        size="lg"
        color="primary"
        endContent={<PlusIcon />}
        onPress={onOpen}>
        Add {screenWidth >= 402 ? "New" : null}
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
                  onSuccess={onClose}
                  onChange={(fields) => {
                    setInventory(fields as ChassisLocation);
                    return fields;
                  }}
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
                    chassisNumber: {
                      hasError: hasMatch
                        ? true
                        : false ||
                          (inventory?.chassisNumber != null &&
                            inventory.chassisNumber.length < 10)
                        ? true
                        : false,
                      errorMessage: hasMatch
                        ? "Chassis already exists in the table"
                        : inventory?.chassisNumber != null &&
                          inventory.chassisNumber.length < 10
                        ? "Must be 10 characters long"
                        : "",
                      onBlur: (e: any) => {
                        console.log("blurrr", e.target.value);
                        const client = generateClient();
                        const checkIfChassisExists = async () => {
                          const res = await client.graphql({
                            query: listChassisLocations,
                            variables: {
                              filter: {
                                chassisNumber: {
                                  eq: e.target.value.toUpperCase(),
                                },
                              },
                            },
                          });
                          if (res.data.listChassisLocations.items.length > 0) {
                            setHasMatch(true);
                          } else setHasMatch(false);
                        };
                        checkIfChassisExists();
                      },
                    },
                    SubmitButton: {
                      isDisabled: hasMatch,
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
