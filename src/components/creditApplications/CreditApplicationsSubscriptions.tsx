import { SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { generateClient } from "aws-amplify/api";
import { GraphQLSubscription } from "@aws-amplify/api";

import {
  CreditApplicationsComments,
  OnCreateCreditApplicationsCommentsSubscription,
  OnDeleteCreditApplicationsCommentsSubscription,
  OnUpdateCreditApplicationsCommentsSubscription,
} from "@/API";

import {
  onCreateCreditApplicationsComments,
  onDeleteCreditApplicationsComments,
  onUpdateCreditApplicationsComments,
} from "@/graphql/subscriptions";

/**
 * AWSSubscriptionEvents Component
 *
 * This component is responsible for setting up and managing real-time subscriptions
 * to receive updates from the AppSync AWS service. It utilizes the useEffect hook to
 * handle the subscription setup and cleanup.
 *
 * Note: This component doesn't render any UI as it focuses on the subscription logic.S
 * Instead, it might trigger state updates or other side effects in response to
 * incoming subscription data.
 */

type AWSSubscriptionEventsProps = {
  setComments: (value: SetStateAction<CreditApplicationsComments[]>) => void;
};

const AWSSubscriptionCreditApplications = ({
  setComments,
}: AWSSubscriptionEventsProps) => {
  // Set up AppSync subscription when the component mounts
  useEffect(() => {
    const client = generateClient();
    const createSubscription = client
      .graphql<
        GraphQLSubscription<OnCreateCreditApplicationsCommentsSubscription>
      >({
        query: onCreateCreditApplicationsComments,
      })
      .subscribe({
        next: ({ data }) => {
          const { onCreateCreditApplicationsComments } = data;
          setComments((prevItems) => [
            ...prevItems,
            onCreateCreditApplicationsComments!,
          ]);
          toast.success(
            `${data.onCreateCreditApplicationsComments?.author} added new comment`
          );
        },
      });

    const updateSubscription = client
      .graphql<
        GraphQLSubscription<OnUpdateCreditApplicationsCommentsSubscription>
      >({
        query: onUpdateCreditApplicationsComments,
      })
      .subscribe({
        next: ({ data }) => {
          setComments((prevItems: CreditApplicationsComments[]) =>
            prevItems.map((comment: CreditApplicationsComments) =>
              comment?.id === data?.onUpdateCreditApplicationsComments?.id
                ? data.onUpdateCreditApplicationsComments
                : comment
            )
          );
          toast.success("Comment updated successfully");
        },
      });

    const deleteSubscription = client
      .graphql<
        GraphQLSubscription<OnDeleteCreditApplicationsCommentsSubscription>
      >({
        query: onDeleteCreditApplicationsComments,
      })
      .subscribe({
        next: async ({ data }) => {
          setComments((prevState) =>
            prevState.filter(
              ({ id }) => id !== data?.onDeleteCreditApplicationsComments?.id
            )
          );
          toast.success("Comment deleted successfully");
        },
      });
    // Clean up the subscription when the component unmounts
    return () => {
      createSubscription.unsubscribe();
      updateSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [setComments]);

  // This component doesn't return any UI elements
  return null;
};

export default AWSSubscriptionCreditApplications;
