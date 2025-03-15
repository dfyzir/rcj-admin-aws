import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  Card,
  Flex,
  Text,
  Divider,
  Image,
  Loader,
  Icon,
} from "@aws-amplify/ui-react";
import { PlusIcon } from "../icons/PlusIcon";
import TrailerRCJCreateForm from "@/ui-components/TrailerRCJCreateForm";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TrailerRCJ } from "@/API";
import { generateClient } from "aws-amplify/api";
import { listChassisLocations, listTrailerRCJS } from "@/graphql/queries";
import { useTheme } from "@/context/themeContext";

//AddTrailerButtonAWS Component:

//This component represents a button to add a new trailer, triggering the display of a modal
//with a form for creating a new trailer using TRailerRCJCreateForm  AWS UI component. It uses NextUI components and AWS services.

const AddTrailerButtonAWS = () => {
  // Use the useDisclosure hook to manage modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { theme } = useTheme();

  const [inventory, setInventory] = useState<TrailerRCJ>();
  const [hasMatch, setHasMatch] = useState(false);

  //processFile processes and formats file data before submission.
  const processFile = ({ file, key }: { file: File; key: string }) => {
    const fileParts = key.split(".");
    const ext = fileParts.pop();
    const uniqueString = uuidv4().replace(/-/g, "").substring(0, 5);
    return {
      file,
      key: `${fileParts.join(".").toUpperCase()}.${uniqueString}.${ext}`,
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
              <ModalBody className="">
                <TrailerRCJCreateForm
                  onSuccess={onClose}
                  onChange={(fields) => {
                    setInventory(fields as TrailerRCJ);
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
                    TrailerRCJCreateForm: {
                      className: "dark:!bg-[#121212]",
                    },
                    inspectionFile: {
                      processFile,
                    },

                    ClearButton: {
                      className:
                        "dark:!text-white dark:!bg-gray-900 dark:hover:!bg-gray-600 dark:!border-gray-950 dark:hover:!text-gray-900",
                    },

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
                            query: listTrailerRCJS,
                            variables: {
                              filter: {
                                chassisNumber: {
                                  eq: e.target.value.toUpperCase(),
                                },
                              },
                            },
                          });
                          if (res.data.listTrailerRCJS.items.length > 0) {
                            setHasMatch(true);
                          } else setHasMatch(false);
                        };
                        checkIfChassisExists();
                      },
                    },
                    SubmitButton: {
                      className:
                        "dark:!bg-[#047d95] dark:hover:!bg-[#7dd6e8] dark:hover:!text-[#047d95]",
                      isDisabled: hasMatch,
                    },
                    CancelButton: {
                      onClick: onClose,
                      className:
                        "dark:!bg-[#bf4040] dark:hover:!bg-[#ef8f8f] dark:hover:!text-[#bf4040]",
                    },
                    registrationFile: { processFile },
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
