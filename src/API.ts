/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateChassisLocationInput = {
  id?: string | null,
  chassisNumber: string,
  location?: string | null,
  container?: string | null,
};

export type ModelChassisLocationConditionInput = {
  chassisNumber?: ModelStringInput | null,
  location?: ModelStringInput | null,
  container?: ModelStringInput | null,
  and?: Array< ModelChassisLocationConditionInput | null > | null,
  or?: Array< ModelChassisLocationConditionInput | null > | null,
  not?: ModelChassisLocationConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ChassisLocation = {
  __typename: "ChassisLocation",
  id: string,
  chassisNumber: string,
  location?: string | null,
  container?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateChassisLocationInput = {
  id: string,
  chassisNumber?: string | null,
  location?: string | null,
  container?: string | null,
};

export type DeleteChassisLocationInput = {
  id: string,
};

export type CreateTrailerRCJInput = {
  id?: string | null,
  chassisNumber?: string | null,
  vinNumber?: string | null,
  plateNumber?: string | null,
  inspectionExpiresAt?: string | null,
  inspectionFile?: string | null,
  registrationExpiresAt?: string | null,
  registrationFile?: string | null,
};

export type ModelTrailerRCJConditionInput = {
  chassisNumber?: ModelStringInput | null,
  vinNumber?: ModelStringInput | null,
  plateNumber?: ModelStringInput | null,
  inspectionExpiresAt?: ModelStringInput | null,
  inspectionFile?: ModelStringInput | null,
  registrationExpiresAt?: ModelStringInput | null,
  registrationFile?: ModelStringInput | null,
  and?: Array< ModelTrailerRCJConditionInput | null > | null,
  or?: Array< ModelTrailerRCJConditionInput | null > | null,
  not?: ModelTrailerRCJConditionInput | null,
};

export type TrailerRCJ = {
  __typename: "TrailerRCJ",
  id: string,
  chassisNumber?: string | null,
  vinNumber?: string | null,
  plateNumber?: string | null,
  inspectionExpiresAt?: string | null,
  inspectionFile?: string | null,
  registrationExpiresAt?: string | null,
  registrationFile?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTrailerRCJInput = {
  id: string,
  chassisNumber?: string | null,
  vinNumber?: string | null,
  plateNumber?: string | null,
  inspectionExpiresAt?: string | null,
  inspectionFile?: string | null,
  registrationExpiresAt?: string | null,
  registrationFile?: string | null,
};

export type DeleteTrailerRCJInput = {
  id: string,
};

export type ModelChassisLocationFilterInput = {
  id?: ModelIDInput | null,
  chassisNumber?: ModelStringInput | null,
  location?: ModelStringInput | null,
  container?: ModelStringInput | null,
  and?: Array< ModelChassisLocationFilterInput | null > | null,
  or?: Array< ModelChassisLocationFilterInput | null > | null,
  not?: ModelChassisLocationFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelChassisLocationConnection = {
  __typename: "ModelChassisLocationConnection",
  items:  Array<ChassisLocation | null >,
  nextToken?: string | null,
};

export type ModelTrailerRCJFilterInput = {
  id?: ModelIDInput | null,
  chassisNumber?: ModelStringInput | null,
  vinNumber?: ModelStringInput | null,
  plateNumber?: ModelStringInput | null,
  inspectionExpiresAt?: ModelStringInput | null,
  inspectionFile?: ModelStringInput | null,
  registrationExpiresAt?: ModelStringInput | null,
  registrationFile?: ModelStringInput | null,
  and?: Array< ModelTrailerRCJFilterInput | null > | null,
  or?: Array< ModelTrailerRCJFilterInput | null > | null,
  not?: ModelTrailerRCJFilterInput | null,
};

export type ModelTrailerRCJConnection = {
  __typename: "ModelTrailerRCJConnection",
  items:  Array<TrailerRCJ | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionChassisLocationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  chassisNumber?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  container?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChassisLocationFilterInput | null > | null,
  or?: Array< ModelSubscriptionChassisLocationFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionTrailerRCJFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  chassisNumber?: ModelSubscriptionStringInput | null,
  vinNumber?: ModelSubscriptionStringInput | null,
  plateNumber?: ModelSubscriptionStringInput | null,
  inspectionExpiresAt?: ModelSubscriptionStringInput | null,
  inspectionFile?: ModelSubscriptionStringInput | null,
  registrationExpiresAt?: ModelSubscriptionStringInput | null,
  registrationFile?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTrailerRCJFilterInput | null > | null,
  or?: Array< ModelSubscriptionTrailerRCJFilterInput | null > | null,
};

export type CreateChassisLocationMutationVariables = {
  input: CreateChassisLocationInput,
  condition?: ModelChassisLocationConditionInput | null,
};

export type CreateChassisLocationMutation = {
  createChassisLocation?:  {
    __typename: "ChassisLocation",
    id: string,
    chassisNumber: string,
    location?: string | null,
    container?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChassisLocationMutationVariables = {
  input: UpdateChassisLocationInput,
  condition?: ModelChassisLocationConditionInput | null,
};

export type UpdateChassisLocationMutation = {
  updateChassisLocation?:  {
    __typename: "ChassisLocation",
    id: string,
    chassisNumber: string,
    location?: string | null,
    container?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChassisLocationMutationVariables = {
  input: DeleteChassisLocationInput,
  condition?: ModelChassisLocationConditionInput | null,
};

export type DeleteChassisLocationMutation = {
  deleteChassisLocation?:  {
    __typename: "ChassisLocation",
    id: string,
    chassisNumber: string,
    location?: string | null,
    container?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTrailerRCJMutationVariables = {
  input: CreateTrailerRCJInput,
  condition?: ModelTrailerRCJConditionInput | null,
};

export type CreateTrailerRCJMutation = {
  createTrailerRCJ?:  {
    __typename: "TrailerRCJ",
    id: string,
    chassisNumber?: string | null,
    vinNumber?: string | null,
    plateNumber?: string | null,
    inspectionExpiresAt?: string | null,
    inspectionFile?: string | null,
    registrationExpiresAt?: string | null,
    registrationFile?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTrailerRCJMutationVariables = {
  input: UpdateTrailerRCJInput,
  condition?: ModelTrailerRCJConditionInput | null,
};

export type UpdateTrailerRCJMutation = {
  updateTrailerRCJ?:  {
    __typename: "TrailerRCJ",
    id: string,
    chassisNumber?: string | null,
    vinNumber?: string | null,
    plateNumber?: string | null,
    inspectionExpiresAt?: string | null,
    inspectionFile?: string | null,
    registrationExpiresAt?: string | null,
    registrationFile?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTrailerRCJMutationVariables = {
  input: DeleteTrailerRCJInput,
  condition?: ModelTrailerRCJConditionInput | null,
};

export type DeleteTrailerRCJMutation = {
  deleteTrailerRCJ?:  {
    __typename: "TrailerRCJ",
    id: string,
    chassisNumber?: string | null,
    vinNumber?: string | null,
    plateNumber?: string | null,
    inspectionExpiresAt?: string | null,
    inspectionFile?: string | null,
    registrationExpiresAt?: string | null,
    registrationFile?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetChassisLocationQueryVariables = {
  id: string,
};

export type GetChassisLocationQuery = {
  getChassisLocation?:  {
    __typename: "ChassisLocation",
    id: string,
    chassisNumber: string,
    location?: string | null,
    container?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChassisLocationsQueryVariables = {
  filter?: ModelChassisLocationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChassisLocationsQuery = {
  listChassisLocations?:  {
    __typename: "ModelChassisLocationConnection",
    items:  Array< {
      __typename: "ChassisLocation",
      id: string,
      chassisNumber: string,
      location?: string | null,
      container?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTrailerRCJQueryVariables = {
  id: string,
};

export type GetTrailerRCJQuery = {
  getTrailerRCJ?:  {
    __typename: "TrailerRCJ",
    id: string,
    chassisNumber?: string | null,
    vinNumber?: string | null,
    plateNumber?: string | null,
    inspectionExpiresAt?: string | null,
    inspectionFile?: string | null,
    registrationExpiresAt?: string | null,
    registrationFile?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTrailerRCJSQueryVariables = {
  filter?: ModelTrailerRCJFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTrailerRCJSQuery = {
  listTrailerRCJS?:  {
    __typename: "ModelTrailerRCJConnection",
    items:  Array< {
      __typename: "TrailerRCJ",
      id: string,
      chassisNumber?: string | null,
      vinNumber?: string | null,
      plateNumber?: string | null,
      inspectionExpiresAt?: string | null,
      inspectionFile?: string | null,
      registrationExpiresAt?: string | null,
      registrationFile?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateChassisLocationSubscriptionVariables = {
  filter?: ModelSubscriptionChassisLocationFilterInput | null,
};

export type OnCreateChassisLocationSubscription = {
  onCreateChassisLocation?:  {
    __typename: "ChassisLocation",
    id: string,
    chassisNumber: string,
    location?: string | null,
    container?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChassisLocationSubscriptionVariables = {
  filter?: ModelSubscriptionChassisLocationFilterInput | null,
};

export type OnUpdateChassisLocationSubscription = {
  onUpdateChassisLocation?:  {
    __typename: "ChassisLocation",
    id: string,
    chassisNumber: string,
    location?: string | null,
    container?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChassisLocationSubscriptionVariables = {
  filter?: ModelSubscriptionChassisLocationFilterInput | null,
};

export type OnDeleteChassisLocationSubscription = {
  onDeleteChassisLocation?:  {
    __typename: "ChassisLocation",
    id: string,
    chassisNumber: string,
    location?: string | null,
    container?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTrailerRCJSubscriptionVariables = {
  filter?: ModelSubscriptionTrailerRCJFilterInput | null,
};

export type OnCreateTrailerRCJSubscription = {
  onCreateTrailerRCJ?:  {
    __typename: "TrailerRCJ",
    id: string,
    chassisNumber?: string | null,
    vinNumber?: string | null,
    plateNumber?: string | null,
    inspectionExpiresAt?: string | null,
    inspectionFile?: string | null,
    registrationExpiresAt?: string | null,
    registrationFile?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrailerRCJSubscriptionVariables = {
  filter?: ModelSubscriptionTrailerRCJFilterInput | null,
};

export type OnUpdateTrailerRCJSubscription = {
  onUpdateTrailerRCJ?:  {
    __typename: "TrailerRCJ",
    id: string,
    chassisNumber?: string | null,
    vinNumber?: string | null,
    plateNumber?: string | null,
    inspectionExpiresAt?: string | null,
    inspectionFile?: string | null,
    registrationExpiresAt?: string | null,
    registrationFile?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTrailerRCJSubscriptionVariables = {
  filter?: ModelSubscriptionTrailerRCJFilterInput | null,
};

export type OnDeleteTrailerRCJSubscription = {
  onDeleteTrailerRCJ?:  {
    __typename: "TrailerRCJ",
    id: string,
    chassisNumber?: string | null,
    vinNumber?: string | null,
    plateNumber?: string | null,
    inspectionExpiresAt?: string | null,
    inspectionFile?: string | null,
    registrationExpiresAt?: string | null,
    registrationFile?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
