/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createDriverApplicationsComments = /* GraphQL */ `mutation CreateDriverApplicationsComments(
  $input: CreateDriverApplicationsCommentsInput!
  $condition: ModelDriverApplicationsCommentsConditionInput
) {
  createDriverApplicationsComments(input: $input, condition: $condition) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDriverApplicationsCommentsMutationVariables,
  APITypes.CreateDriverApplicationsCommentsMutation
>;
export const updateDriverApplicationsComments = /* GraphQL */ `mutation UpdateDriverApplicationsComments(
  $input: UpdateDriverApplicationsCommentsInput!
  $condition: ModelDriverApplicationsCommentsConditionInput
) {
  updateDriverApplicationsComments(input: $input, condition: $condition) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDriverApplicationsCommentsMutationVariables,
  APITypes.UpdateDriverApplicationsCommentsMutation
>;
export const deleteDriverApplicationsComments = /* GraphQL */ `mutation DeleteDriverApplicationsComments(
  $input: DeleteDriverApplicationsCommentsInput!
  $condition: ModelDriverApplicationsCommentsConditionInput
) {
  deleteDriverApplicationsComments(input: $input, condition: $condition) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDriverApplicationsCommentsMutationVariables,
  APITypes.DeleteDriverApplicationsCommentsMutation
>;
export const createCreditApplicationsComments = /* GraphQL */ `mutation CreateCreditApplicationsComments(
  $input: CreateCreditApplicationsCommentsInput!
  $condition: ModelCreditApplicationsCommentsConditionInput
) {
  createCreditApplicationsComments(input: $input, condition: $condition) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCreditApplicationsCommentsMutationVariables,
  APITypes.CreateCreditApplicationsCommentsMutation
>;
export const updateCreditApplicationsComments = /* GraphQL */ `mutation UpdateCreditApplicationsComments(
  $input: UpdateCreditApplicationsCommentsInput!
  $condition: ModelCreditApplicationsCommentsConditionInput
) {
  updateCreditApplicationsComments(input: $input, condition: $condition) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCreditApplicationsCommentsMutationVariables,
  APITypes.UpdateCreditApplicationsCommentsMutation
>;
export const deleteCreditApplicationsComments = /* GraphQL */ `mutation DeleteCreditApplicationsComments(
  $input: DeleteCreditApplicationsCommentsInput!
  $condition: ModelCreditApplicationsCommentsConditionInput
) {
  deleteCreditApplicationsComments(input: $input, condition: $condition) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCreditApplicationsCommentsMutationVariables,
  APITypes.DeleteCreditApplicationsCommentsMutation
>;
export const createNewDriverPersonalInfo = /* GraphQL */ `mutation CreateNewDriverPersonalInfo(
  $input: CreateNewDriverPersonalInfoInput!
  $condition: ModelNewDriverPersonalInfoConditionInput
) {
  createNewDriverPersonalInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateNewDriverPersonalInfoMutationVariables,
  APITypes.CreateNewDriverPersonalInfoMutation
>;
export const updateNewDriverPersonalInfo = /* GraphQL */ `mutation UpdateNewDriverPersonalInfo(
  $input: UpdateNewDriverPersonalInfoInput!
  $condition: ModelNewDriverPersonalInfoConditionInput
) {
  updateNewDriverPersonalInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateNewDriverPersonalInfoMutationVariables,
  APITypes.UpdateNewDriverPersonalInfoMutation
>;
export const deleteNewDriverPersonalInfo = /* GraphQL */ `mutation DeleteNewDriverPersonalInfo(
  $input: DeleteNewDriverPersonalInfoInput!
  $condition: ModelNewDriverPersonalInfoConditionInput
) {
  deleteNewDriverPersonalInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteNewDriverPersonalInfoMutationVariables,
  APITypes.DeleteNewDriverPersonalInfoMutation
>;
export const createChassisLocation = /* GraphQL */ `mutation CreateChassisLocation(
  $input: CreateChassisLocationInput!
  $condition: ModelChassisLocationConditionInput
) {
  createChassisLocation(input: $input, condition: $condition) {
    id
    chassisNumber
    location
    container
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChassisLocationMutationVariables,
  APITypes.CreateChassisLocationMutation
>;
export const updateChassisLocation = /* GraphQL */ `mutation UpdateChassisLocation(
  $input: UpdateChassisLocationInput!
  $condition: ModelChassisLocationConditionInput
) {
  updateChassisLocation(input: $input, condition: $condition) {
    id
    chassisNumber
    location
    container
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChassisLocationMutationVariables,
  APITypes.UpdateChassisLocationMutation
>;
export const deleteChassisLocation = /* GraphQL */ `mutation DeleteChassisLocation(
  $input: DeleteChassisLocationInput!
  $condition: ModelChassisLocationConditionInput
) {
  deleteChassisLocation(input: $input, condition: $condition) {
    id
    chassisNumber
    location
    container
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChassisLocationMutationVariables,
  APITypes.DeleteChassisLocationMutation
>;
export const createTrailerRCJ = /* GraphQL */ `mutation CreateTrailerRCJ(
  $input: CreateTrailerRCJInput!
  $condition: ModelTrailerRCJConditionInput
) {
  createTrailerRCJ(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTrailerRCJMutationVariables,
  APITypes.CreateTrailerRCJMutation
>;
export const updateTrailerRCJ = /* GraphQL */ `mutation UpdateTrailerRCJ(
  $input: UpdateTrailerRCJInput!
  $condition: ModelTrailerRCJConditionInput
) {
  updateTrailerRCJ(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTrailerRCJMutationVariables,
  APITypes.UpdateTrailerRCJMutation
>;
export const deleteTrailerRCJ = /* GraphQL */ `mutation DeleteTrailerRCJ(
  $input: DeleteTrailerRCJInput!
  $condition: ModelTrailerRCJConditionInput
) {
  deleteTrailerRCJ(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTrailerRCJMutationVariables,
  APITypes.DeleteTrailerRCJMutation
>;
