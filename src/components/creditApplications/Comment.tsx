import { CreditApplicationsComments } from "@/API";
import {
  deleteCreditApplicationsComments,
  updateCreditApplicationsComments,
} from "@/graphql/mutations";
import { Button, Textarea } from "@nextui-org/react";
import { generateClient } from "aws-amplify/api";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";

const Comment = ({ comment }: { comment: CreditApplicationsComments }) => {
  const client = generateClient();
  const [currentValue, setCurrentValue] = useState<string>("");

  useEffect(() => {
    if (comment?.text) {
      setCurrentValue(comment.text);
    }
  }, [comment]);
  const handleDeleteComment = async () => {
    await client.graphql({
      query: deleteCreditApplicationsComments,
      variables: {
        input: {
          id: comment.id,
        },
      },
    });
    return;
  };

  const handleUpdateComment = async () => {
    if (comment.text?.trim() === currentValue.trim()) {
      return;
    }

    if (currentValue.trim().length === 0) {
      await handleDeleteComment();
    }
    await client.graphql({
      query: updateCreditApplicationsComments,
      variables: {
        input: { id: comment.id, text: currentValue },
      },
    });
  };
  return (
    <div className="w-full flex flex-row gap-4 items-center px-3">
      <Textarea
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleUpdateComment}
        label={`By: ${comment?.author}`}
        labelPlacement="outside"
        description={format(
          new Date(comment.createdAt ?? ""),
          "yyyy-MM-dd hh:mm a"
        )}
        errorMessage={
          currentValue?.length === 0 ? "Empty comment will be deleted." : ""
        }
      />
      <Button
        size="sm"
        color="danger"
        variant="light"
        onPress={handleDeleteComment}
        isIconOnly>
        <DeleteIcon size={24} width={18} height={18} />
      </Button>{" "}
    </div>
  );
};

export default Comment;
