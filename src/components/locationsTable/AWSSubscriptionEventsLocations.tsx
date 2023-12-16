import { SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { generateClient } from "aws-amplify/api";
import { remove } from "aws-amplify/storage";
import { GraphQLSubscription } from "@aws-amplify/api";

import {
  ChassisLocation,
  OnCreateChassisLocationSubscription,
  OnCreateTrailerRCJSubscription,
  OnDeleteChassisLocationSubscription,
  OnDeleteTrailerRCJSubscription,
  OnUpdateChassisLocationSubscription,
  OnUpdateTrailerRCJSubscription,
  TrailerRCJ,
} from "@/API";

import {
  onCreateTrailerRCJ,
  onUpdateTrailerRCJ,
  onDeleteChassisLocation,
  onCreateChassisLocation,
  onUpdateChassisLocation,
} from "@/graphql/subscriptions";

/**
 * AWSSubscriptionEvents Component
 *
 * This component is responsible for setting up and managing real-time subscriptions
 * to receive updates from the AppSync AWS service. It utilizes the useEffect hook to
 * handle the subscription setup and cleanup.
 *
 * Note: This component doesn't render any UI as it focuses on the subscription logic.
 * Instead, it might trigger state updates or other side effects in response to
 * incoming subscription data.
 */

type AWSSubscriptionEventsProps = {
  setLocations: (value: SetStateAction<ChassisLocation[]>) => void;
  setFilterValue: (value: SetStateAction<string>) => void;
};

const AWSSubscriptionEventsLocations = ({
  setLocations,
  setFilterValue,
}: AWSSubscriptionEventsProps) => {
  // Set up AppSync subscription when the component mounts
  useEffect(() => {
    const client = generateClient();
    const createSubscription = client
      .graphql<GraphQLSubscription<OnCreateChassisLocationSubscription>>({
        query: onCreateChassisLocation,
      })
      .subscribe({
        next: ({ data }) => {
          const { onCreateChassisLocation } = data;
          setLocations((prevItems) => [...prevItems, onCreateChassisLocation!]);
          setFilterValue("");
          toast.success("Trailer location created successfully");
        },
      });

    const updateSubscription = client
      .graphql<GraphQLSubscription<OnUpdateChassisLocationSubscription>>({
        query: onUpdateChassisLocation,
      })
      .subscribe({
        next: ({ data }) => {
          setLocations((prevItems: ChassisLocation[]) =>
            prevItems.map((location: ChassisLocation) =>
              location?.id === data?.onUpdateChassisLocation?.id
                ? data.onUpdateChassisLocation
                : location
            )
          );
          setFilterValue("");
          toast.success("Trailer location updated successfully");
        },
      });

    const deleteSubscription = client
      .graphql<GraphQLSubscription<OnDeleteChassisLocationSubscription>>({
        query: onDeleteChassisLocation,
      })
      .subscribe({
        next: async ({ data }) => {
          setLocations((prevState) =>
            prevState.filter(
              ({ id }) => id !== data?.onDeleteChassisLocation?.id
            )
          );
          setFilterValue("");
          toast.success("Trailer location deleted successfully");
        },
      });
    // Clean up the subscription when the component unmounts
    return () => {
      createSubscription.unsubscribe();
      updateSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [setFilterValue, setLocations]);

  // This component doesn't return any UI elements
  return null;
};

export default AWSSubscriptionEventsLocations;
