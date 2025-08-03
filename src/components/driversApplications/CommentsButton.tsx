import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Textarea,
  Badge,
} from "@nextui-org/react";

import { PlusIcon } from "../icons/PlusIcon";
import { useState } from "react";
import { DriverApplicationsComments } from "@/API";
import { generateClient } from "aws-amplify/api";
import React from "react";
import { CommentIcon } from "../icons/CommentIcon";
import Comment from "./Comment";
import { createDriverApplicationsComments } from "@/graphql/mutations";
import { useAuthenticator } from "@aws-amplify/ui-react";

//AddCommentButtonAWS Component:

//This component represents a button to add a new trailer, triggering the display of a modal
//with a form for creating a new trailer using TRailerRCJCreateForm  AWS UI component. It uses NextUI components and AWS services.

const CommentButtonAWS = ({
  fileId,
  comments,
}: {
  fileId: string;
  comments: DriverApplicationsComments[];
}) => {
  // Use the useDisclosure hook to manage modal visibility
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newComment, setNewComment] = useState<string>("");
  const { user } = useAuthenticator();

  const handleAddNewComment = async () => {
    if (!newComment.trim().length) {
      return;
    }
    const newFileComment = {
      text: newComment,
      author: user?.signInDetails?.loginId ?? user?.userId ?? "n/a",
      createdAt: new Date().toISOString(),
      fileId,
    };
    try {
      const client = generateClient();
      await client
        .graphql({
          query: createDriverApplicationsComments,
          variables: { input: { ...newFileComment } },
        })
        .then(() => setNewComment(""));
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  return (
    <div>
      <Button
        isIconOnly
        variant="light"
        color="warning"
        title="Comments"
        onPress={onOpen}
        className="overflow-visible">
        <Badge
          color="primary"
          content={comments?.length ?? 0}
          className="pb-1 border-0">
          <CommentIcon />
        </Badge>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="5xl"
        className="max-w-[500px]"
        scrollBehavior="inside">
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-row justify-between w-full gap-4 pr-4">
                  Comments{" "}
                </div>
              </ModalHeader>
              <ModalBody className="pb-8">
                {comments?.length ? (
                  (comments ?? []).map((comment) => (
                    <React.Fragment key={comment.id}>
                      <Comment comment={comment} />
                    </React.Fragment>
                  ))
                ) : (
                  <div className="w-full text-center pb-8">No comments</div>
                )}
                <div className="flex flex-row gap-4 w-full justify-end items-center">
                  {" "}
                  <Textarea
                    placeholder="Enter new comment"
                    className="max-w-sm"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    isIconOnly
                    color="primary"
                    startContent={<PlusIcon />}
                    onPress={handleAddNewComment}
                    isDisabled={newComment.trim().length === 0}
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

export default CommentButtonAWS;
