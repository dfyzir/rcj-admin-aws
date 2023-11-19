import { SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { generateClient } from "aws-amplify/api";
import { remove } from "aws-amplify/storage";
import { GraphQLSubscription } from "@aws-amplify/api";

import {
  OnCreateTrailerRCJSubscription,
  OnDeleteTrailerRCJSubscription,
  OnUpdateTrailerRCJSubscription,
  TrailerRCJ,
} from "@/API";

import {
  onCreateTrailerRCJ,
  onUpdateTrailerRCJ,
  onDeleteTrailerRCJ,
} from "@/graphql/subscriptions";

type SubscriptionDummyProps = {
  setTrailers: (value: SetStateAction<TrailerRCJ[]>) => void;
  setFilterValue: (value: SetStateAction<string>) => void;
};

const SubscriptionDummy = ({
  setTrailers,
  setFilterValue,
}: SubscriptionDummyProps) => {
  useEffect(() => {
    const client = generateClient();
    const createSubscription = client
      .graphql<GraphQLSubscription<OnCreateTrailerRCJSubscription>>({
        query: onCreateTrailerRCJ,
      })
      .subscribe({
        next: ({ data }) => {
          const { onCreateTrailerRCJ } = data;
          setTrailers((prevItems) => [...prevItems, onCreateTrailerRCJ!]);
          setFilterValue("");
          toast.success("Trailer created successfully");
        },
      });

    const updateSubscription = client
      .graphql<GraphQLSubscription<OnUpdateTrailerRCJSubscription>>({
        query: onUpdateTrailerRCJ,
      })
      .subscribe({
        next: ({ data }) => {
          setTrailers((prevItems: TrailerRCJ[]) =>
            prevItems.map((trailer: TrailerRCJ) =>
              trailer?.id === data?.onUpdateTrailerRCJ?.id
                ? data.onUpdateTrailerRCJ
                : trailer
            )
          );
          setFilterValue("");
          toast.success("Trailer updated successfully");
        },
      });

    const deleteSubscription = client
      .graphql<GraphQLSubscription<OnDeleteTrailerRCJSubscription>>({
        query: onDeleteTrailerRCJ,
      })
      .subscribe({
        next: async ({ data }) => {
          setTrailers((prevState) =>
            prevState.filter(({ id }) => id !== data?.onDeleteTrailerRCJ?.id)
          );
          setFilterValue("");

          const { inspectionFile } = data?.onDeleteTrailerRCJ!;
          await remove({ key: inspectionFile as string });

          const { registrationFile } = data?.onDeleteTrailerRCJ!;
          await remove({ key: registrationFile as string });

          toast.success("Trailer deleted successfully");
        },
      });

    return () => {
      createSubscription.unsubscribe();
      updateSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [setFilterValue, setTrailers]);
  return null;
};

export default SubscriptionDummy;
