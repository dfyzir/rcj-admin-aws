import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { PlusIcon } from "../../icons/PlusIcon";
import ChassisLoctionCreateForm from "@/ui-components/ChassisLocationCreateForm";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ChassisLocation } from "@/API";
import { generateClient } from "aws-amplify/api";
import { listChassisLocations } from "@/graphql/queries";
import { Flex, HighlightMatch } from "@aws-amplify/ui-react";

//AddTrailerButtonAWS Component:

//This component represents a button to add a new trailer, triggering the display of a modal
//with a form for creating a new trailer using TRailerRCJCreateForm  AWS UI component. It uses NextUI components and AWS services.

type AddLocationButtonAWSProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const AddLocationButtonAWS = ({
  className = "text-sm font-semibold sm:text-base",
  size = "lg",
}: AddLocationButtonAWSProps) => {
  const [inventory, setInventory] = useState<ChassisLocation>();
  const [hasMatch, setHasMatch] = useState(false);
  // Use the useDisclosure hook to manage modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderOptions = (options: any, value: any) => {
    const { label } = options;
    return (
      <Flex
        alignItems="center"
        className="dark:!bg-gray-700 dark:hover:!bg-[#047d95]  dark:!text-gray-300 !-mx-3 !p-2 !-my-2">
        <HighlightMatch query={value}>{label}</HighlightMatch>
      </Flex>
    );
  };
  const buttonClassName = `h-10 px-4 text-sm font-semibold sm:h-11 sm:px-5 sm:text-[0.95rem] ${className}`;

  //processFile processes and formats file data before submission.
  return (
    <div className="inline-flex shrink-0">
      <Button
        className={buttonClassName}
        size={size}
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
                        : inventory?.chassisNumber != null &&
                          inventory.chassisNumber.length !== 10
                        ? true
                        : false,
                      errorMessage: hasMatch
                        ? "Chassis already exists in the table"
                        : inventory?.chassisNumber != null &&
                          inventory.chassisNumber.length !== 10
                        ? "Must be 10 characters long"
                        : "",
                      onBlur: (e: any) => {
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
                    location: {
                      renderOption: renderOptions,
                    },
                    SubmitButton: {
                      className:
                        "dark:!bg-[#047d95] dark:hover:!bg-[#7dd6e8] dark:hover:!text-[#047d95]",
                      isDisabled: hasMatch,
                    },
                    ClearButton: {
                      className:
                        "dark:!bg-[#bf4040] dark:hover:!bg-[#ef8f8f] dark:hover:!text-[#bf4040]",
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
