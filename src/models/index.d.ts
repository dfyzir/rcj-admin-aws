import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerTrailerRCJ = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TrailerRCJ, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chassisNumber?: string | null;
  readonly vinNumber?: string | null;
  readonly plateNumber?: string | null;
  readonly inspectionExpiresAt?: string | null;
  readonly inspectionFile?: string | null;
  readonly registrationExpiresAt?: string | null;
  readonly registrationFile?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTrailerRCJ = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TrailerRCJ, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chassisNumber?: string | null;
  readonly vinNumber?: string | null;
  readonly plateNumber?: string | null;
  readonly inspectionExpiresAt?: string | null;
  readonly inspectionFile?: string | null;
  readonly registrationExpiresAt?: string | null;
  readonly registrationFile?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TrailerRCJ = LazyLoading extends LazyLoadingDisabled ? EagerTrailerRCJ : LazyTrailerRCJ

export declare const TrailerRCJ: (new (init: ModelInit<TrailerRCJ>) => TrailerRCJ) & {
  copyOf(source: TrailerRCJ, mutator: (draft: MutableModel<TrailerRCJ>) => MutableModel<TrailerRCJ> | void): TrailerRCJ;
}