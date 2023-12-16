/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateChassisLocation = /* GraphQL */ `subscription OnCreateChassisLocation(
  $filter: ModelSubscriptionChassisLocationFilterInput
) {
  onCreateChassisLocation(filter: $filter) {
    id
    chassisNumber
    location
    container
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChassisLocationSubscriptionVariables,
  APITypes.OnCreateChassisLocationSubscription
>;
export const onUpdateChassisLocation = /* GraphQL */ `subscription OnUpdateChassisLocation(
  $filter: ModelSubscriptionChassisLocationFilterInput
) {
  onUpdateChassisLocation(filter: $filter) {
    id
    chassisNumber
    location
    container
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChassisLocationSubscriptionVariables,
  APITypes.OnUpdateChassisLocationSubscription
>;
export const onDeleteChassisLocation = /* GraphQL */ `subscription OnDeleteChassisLocation(
  $filter: ModelSubscriptionChassisLocationFilterInput
) {
  onDeleteChassisLocation(filter: $filter) {
    id
    chassisNumber
    location
    container
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChassisLocationSubscriptionVariables,
  APITypes.OnDeleteChassisLocationSubscription
>;
export const onCreateTrailerRCJ = /* GraphQL */ `subscription OnCreateTrailerRCJ(
  $filter: ModelSubscriptionTrailerRCJFilterInput
) {
  onCreateTrailerRCJ(filter: $filter) {
    id
    chassisNumber
    vinNumber
    plateNumber
    inspectionExpiresAt
    inspectionFile
    registrationExpiresAt
    registrationFile
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTrailerRCJSubscriptionVariables,
  APITypes.OnCreateTrailerRCJSubscription
>;
export const onUpdateTrailerRCJ = /* GraphQL */ `subscription OnUpdateTrailerRCJ(
  $filter: ModelSubscriptionTrailerRCJFilterInput
) {
  onUpdateTrailerRCJ(filter: $filter) {
    id
    chassisNumber
    vinNumber
    plateNumber
    inspectionExpiresAt
    inspectionFile
    registrationExpiresAt
    registrationFile
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTrailerRCJSubscriptionVariables,
  APITypes.OnUpdateTrailerRCJSubscription
>;
export const onDeleteTrailerRCJ = /* GraphQL */ `subscription OnDeleteTrailerRCJ(
  $filter: ModelSubscriptionTrailerRCJFilterInput
) {
  onDeleteTrailerRCJ(filter: $filter) {
    id
    chassisNumber
    vinNumber
    plateNumber
    inspectionExpiresAt
    inspectionFile
    registrationExpiresAt
    registrationFile
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTrailerRCJSubscriptionVariables,
  APITypes.OnDeleteTrailerRCJSubscription
>;
