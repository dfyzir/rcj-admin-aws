import { SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { generateClient } from "aws-amplify/api";
import { remove } from "aws-amplify/storage";
import { GraphQLSubscription } from "@aws-amplify/api";

import {
  DriverApplicationsComments,
  OnCreateDriverApplicationsCommentsSubscription,
  OnDeleteDriverApplicationsCommentsSubscription,
  OnUpdateDriverApplicationsCommentsSubscription,
} from "@/API";

import {
  onCreateDriverApplicationsComments,
  onDeleteDriverApplicationsComments,
  onUpdateDriverApplicationsComments,
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
  setComments: (value: SetStateAction<DriverApplicationsComments[]>) => void;
};

const AWSSubscriptionDriverApplications = ({
  setComments,
}: AWSSubscriptionEventsProps) => {
  // Set up AppSync subscription when the component mounts
  useEffect(() => {
    const client = generateClient();
    const createSubscription = client
      .graphql<
        GraphQLSubscription<OnCreateDriverApplicationsCommentsSubscription>
      >({
        query: onCreateDriverApplicationsComments,
      })
      .subscribe({
        next: ({ data }) => {
          const { onCreateDriverApplicationsComments } = data;
          setComments((prevItems) => [
            ...prevItems,
            onCreateDriverApplicationsComments!,
          ]);

          toast.success(
            `${data.onCreateDriverApplicationsComments?.author} added new comment`
          );
        },
      });

    const updateSubscription = client
      .graphql<
        GraphQLSubscription<OnUpdateDriverApplicationsCommentsSubscription>
      >({
        query: onUpdateDriverApplicationsComments,
      })
      .subscribe({
        next: ({ data }) => {
          setComments((prevItems: DriverApplicationsComments[]) =>
            prevItems.map((comment: DriverApplicationsComments) =>
              comment?.id === data?.onUpdateDriverApplicationsComments?.id
                ? data.onUpdateDriverApplicationsComments
                : comment
            )
          );

          toast.success("Comment updated successfully");
        },
      });

    const deleteSubscription = client
      .graphql<
        GraphQLSubscription<OnDeleteDriverApplicationsCommentsSubscription>
      >({
        query: onDeleteDriverApplicationsComments,
      })
      .subscribe({
        next: async ({ data }) => {
          setComments((prevState) =>
            prevState.filter(
              ({ id }) => id !== data?.onDeleteDriverApplicationsComments?.id
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

export default AWSSubscriptionDriverApplications;
