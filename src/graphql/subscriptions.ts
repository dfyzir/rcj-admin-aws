/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateDriverApplicationsComments = /* GraphQL */ `subscription OnCreateDriverApplicationsComments(
  $filter: ModelSubscriptionDriverApplicationsCommentsFilterInput
) {
  onCreateDriverApplicationsComments(filter: $filter) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateDriverApplicationsCommentsSubscriptionVariables,
  APITypes.OnCreateDriverApplicationsCommentsSubscription
>;
export const onUpdateDriverApplicationsComments = /* GraphQL */ `subscription OnUpdateDriverApplicationsComments(
  $filter: ModelSubscriptionDriverApplicationsCommentsFilterInput
) {
  onUpdateDriverApplicationsComments(filter: $filter) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateDriverApplicationsCommentsSubscriptionVariables,
  APITypes.OnUpdateDriverApplicationsCommentsSubscription
>;
export const onDeleteDriverApplicationsComments = /* GraphQL */ `subscription OnDeleteDriverApplicationsComments(
  $filter: ModelSubscriptionDriverApplicationsCommentsFilterInput
) {
  onDeleteDriverApplicationsComments(filter: $filter) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteDriverApplicationsCommentsSubscriptionVariables,
  APITypes.OnDeleteDriverApplicationsCommentsSubscription
>;
export const onCreateCreditApplicationsComments = /* GraphQL */ `subscription OnCreateCreditApplicationsComments(
  $filter: ModelSubscriptionCreditApplicationsCommentsFilterInput
) {
  onCreateCreditApplicationsComments(filter: $filter) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCreditApplicationsCommentsSubscriptionVariables,
  APITypes.OnCreateCreditApplicationsCommentsSubscription
>;
export const onUpdateCreditApplicationsComments = /* GraphQL */ `subscription OnUpdateCreditApplicationsComments(
  $filter: ModelSubscriptionCreditApplicationsCommentsFilterInput
) {
  onUpdateCreditApplicationsComments(filter: $filter) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCreditApplicationsCommentsSubscriptionVariables,
  APITypes.OnUpdateCreditApplicationsCommentsSubscription
>;
export const onDeleteCreditApplicationsComments = /* GraphQL */ `subscription OnDeleteCreditApplicationsComments(
  $filter: ModelSubscriptionCreditApplicationsCommentsFilterInput
) {
  onDeleteCreditApplicationsComments(filter: $filter) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCreditApplicationsCommentsSubscriptionVariables,
  APITypes.OnDeleteCreditApplicationsCommentsSubscription
>;
export const onCreateNewDriverPersonalInfo = /* GraphQL */ `subscription OnCreateNewDriverPersonalInfo(
  $filter: ModelSubscriptionNewDriverPersonalInfoFilterInput
) {
  onCreateNewDriverPersonalInfo(filter: $filter) {
    id
    firstName
    lastName
    middleName
    datOfBirth
    socialSecurityNumber
    primaryPhoneNumber
    altPhoneNumber
    licenseNumber
    licenseCategory
    licenseState
    licenseExpirationDate
    primaryAddress
    primaryCity
    primaryState
    primaryZip
    secondaryAddress
    secondaryCity
    secondaryState
    secondaryZip
    drivingExperience
    accidentHistory
    criminalHistory
    employmentHistory
    emergencyContact
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNewDriverPersonalInfoSubscriptionVariables,
  APITypes.OnCreateNewDriverPersonalInfoSubscription
>;
export const onUpdateNewDriverPersonalInfo = /* GraphQL */ `subscription OnUpdateNewDriverPersonalInfo(
  $filter: ModelSubscriptionNewDriverPersonalInfoFilterInput
) {
  onUpdateNewDriverPersonalInfo(filter: $filter) {
    id
    firstName
    lastName
    middleName
    datOfBirth
    socialSecurityNumber
    primaryPhoneNumber
    altPhoneNumber
    licenseNumber
    licenseCategory
    licenseState
    licenseExpirationDate
    primaryAddress
    primaryCity
    primaryState
    primaryZip
    secondaryAddress
    secondaryCity
    secondaryState
    secondaryZip
    drivingExperience
    accidentHistory
    criminalHistory
    employmentHistory
    emergencyContact
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNewDriverPersonalInfoSubscriptionVariables,
  APITypes.OnUpdateNewDriverPersonalInfoSubscription
>;
export const onDeleteNewDriverPersonalInfo = /* GraphQL */ `subscription OnDeleteNewDriverPersonalInfo(
  $filter: ModelSubscriptionNewDriverPersonalInfoFilterInput
) {
  onDeleteNewDriverPersonalInfo(filter: $filter) {
    id
    firstName
    lastName
    middleName
    datOfBirth
    socialSecurityNumber
    primaryPhoneNumber
    altPhoneNumber
    licenseNumber
    licenseCategory
    licenseState
    licenseExpirationDate
    primaryAddress
    primaryCity
    primaryState
    primaryZip
    secondaryAddress
    secondaryCity
    secondaryState
    secondaryZip
    drivingExperience
    accidentHistory
    criminalHistory
    employmentHistory
    emergencyContact
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNewDriverPersonalInfoSubscriptionVariables,
  APITypes.OnDeleteNewDriverPersonalInfoSubscription
>;
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
