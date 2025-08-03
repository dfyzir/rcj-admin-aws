/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getDriverApplicationsComments = /* GraphQL */ `query GetDriverApplicationsComments($id: ID!) {
  getDriverApplicationsComments(id: $id) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDriverApplicationsCommentsQueryVariables,
  APITypes.GetDriverApplicationsCommentsQuery
>;
export const listDriverApplicationsComments = /* GraphQL */ `query ListDriverApplicationsComments(
  $filter: ModelDriverApplicationsCommentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listDriverApplicationsComments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      text
      createdAt
      author
      fileId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDriverApplicationsCommentsQueryVariables,
  APITypes.ListDriverApplicationsCommentsQuery
>;
export const getCreditApplicationsComments = /* GraphQL */ `query GetCreditApplicationsComments($id: ID!) {
  getCreditApplicationsComments(id: $id) {
    id
    text
    createdAt
    author
    fileId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCreditApplicationsCommentsQueryVariables,
  APITypes.GetCreditApplicationsCommentsQuery
>;
export const listCreditApplicationsComments = /* GraphQL */ `query ListCreditApplicationsComments(
  $filter: ModelCreditApplicationsCommentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listCreditApplicationsComments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      text
      createdAt
      author
      fileId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCreditApplicationsCommentsQueryVariables,
  APITypes.ListCreditApplicationsCommentsQuery
>;
export const getNewDriverPersonalInfo = /* GraphQL */ `query GetNewDriverPersonalInfo($id: ID!) {
  getNewDriverPersonalInfo(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetNewDriverPersonalInfoQueryVariables,
  APITypes.GetNewDriverPersonalInfoQuery
>;
export const listNewDriverPersonalInfos = /* GraphQL */ `query ListNewDriverPersonalInfos(
  $filter: ModelNewDriverPersonalInfoFilterInput
  $limit: Int
  $nextToken: String
) {
  listNewDriverPersonalInfos(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNewDriverPersonalInfosQueryVariables,
  APITypes.ListNewDriverPersonalInfosQuery
>;
export const getChassisLocation = /* GraphQL */ `query GetChassisLocation($id: ID!) {
  getChassisLocation(id: $id) {
    id
    chassisNumber
    location
    container
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChassisLocationQueryVariables,
  APITypes.GetChassisLocationQuery
>;
export const listChassisLocations = /* GraphQL */ `query ListChassisLocations(
  $filter: ModelChassisLocationFilterInput
  $limit: Int
  $nextToken: String
) {
  listChassisLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      chassisNumber
      location
      container
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChassisLocationsQueryVariables,
  APITypes.ListChassisLocationsQuery
>;
export const getTrailerRCJ = /* GraphQL */ `query GetTrailerRCJ($id: ID!) {
  getTrailerRCJ(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTrailerRCJQueryVariables,
  APITypes.GetTrailerRCJQuery
>;
export const listTrailerRCJS = /* GraphQL */ `query ListTrailerRCJS(
  $filter: ModelTrailerRCJFilterInput
  $limit: Int
  $nextToken: String
) {
  listTrailerRCJS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTrailerRCJSQueryVariables,
  APITypes.ListTrailerRCJSQuery
>;
