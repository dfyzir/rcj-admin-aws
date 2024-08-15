/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getNewDriverPersonalInfo } from "../graphql/queries";
import { updateNewDriverPersonalInfo } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function NewDriverPersonalInfoUpdateForm(props) {
  const {
    id: idProp,
    newDriverPersonalInfo: newDriverPersonalInfoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    datOfBirth: "",
    socialSecurityNumber: "",
    primaryPhoneNumber: "",
    altPhoneNumber: "",
    licenseNumber: "",
    licenseCategory: "",
    licenseState: "",
    licenseExpirationDate: "",
    primaryAddress: "",
    primaryCity: "",
    primaryState: "",
    primaryZip: "",
    secondaryAddress: "",
    secondaryCity: "",
    secondaryState: "",
    secondaryZip: "",
    drivingExperience: [],
    accidentHistory: [],
    criminalHistory: [],
    employmentHistory: [],
    emergencyContact: [],
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [middleName, setMiddleName] = React.useState(initialValues.middleName);
  const [datOfBirth, setDatOfBirth] = React.useState(initialValues.datOfBirth);
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState(
    initialValues.socialSecurityNumber
  );
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = React.useState(
    initialValues.primaryPhoneNumber
  );
  const [altPhoneNumber, setAltPhoneNumber] = React.useState(
    initialValues.altPhoneNumber
  );
  const [licenseNumber, setLicenseNumber] = React.useState(
    initialValues.licenseNumber
  );
  const [licenseCategory, setLicenseCategory] = React.useState(
    initialValues.licenseCategory
  );
  const [licenseState, setLicenseState] = React.useState(
    initialValues.licenseState
  );
  const [licenseExpirationDate, setLicenseExpirationDate] = React.useState(
    initialValues.licenseExpirationDate
  );
  const [primaryAddress, setPrimaryAddress] = React.useState(
    initialValues.primaryAddress
  );
  const [primaryCity, setPrimaryCity] = React.useState(
    initialValues.primaryCity
  );
  const [primaryState, setPrimaryState] = React.useState(
    initialValues.primaryState
  );
  const [primaryZip, setPrimaryZip] = React.useState(initialValues.primaryZip);
  const [secondaryAddress, setSecondaryAddress] = React.useState(
    initialValues.secondaryAddress
  );
  const [secondaryCity, setSecondaryCity] = React.useState(
    initialValues.secondaryCity
  );
  const [secondaryState, setSecondaryState] = React.useState(
    initialValues.secondaryState
  );
  const [secondaryZip, setSecondaryZip] = React.useState(
    initialValues.secondaryZip
  );
  const [drivingExperience, setDrivingExperience] = React.useState(
    initialValues.drivingExperience
  );
  const [accidentHistory, setAccidentHistory] = React.useState(
    initialValues.accidentHistory
  );
  const [criminalHistory, setCriminalHistory] = React.useState(
    initialValues.criminalHistory
  );
  const [employmentHistory, setEmploymentHistory] = React.useState(
    initialValues.employmentHistory
  );
  const [emergencyContact, setEmergencyContact] = React.useState(
    initialValues.emergencyContact
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = newDriverPersonalInfoRecord
      ? { ...initialValues, ...newDriverPersonalInfoRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setMiddleName(cleanValues.middleName);
    setDatOfBirth(cleanValues.datOfBirth);
    setSocialSecurityNumber(cleanValues.socialSecurityNumber);
    setPrimaryPhoneNumber(cleanValues.primaryPhoneNumber);
    setAltPhoneNumber(cleanValues.altPhoneNumber);
    setLicenseNumber(cleanValues.licenseNumber);
    setLicenseCategory(cleanValues.licenseCategory);
    setLicenseState(cleanValues.licenseState);
    setLicenseExpirationDate(cleanValues.licenseExpirationDate);
    setPrimaryAddress(cleanValues.primaryAddress);
    setPrimaryCity(cleanValues.primaryCity);
    setPrimaryState(cleanValues.primaryState);
    setPrimaryZip(cleanValues.primaryZip);
    setSecondaryAddress(cleanValues.secondaryAddress);
    setSecondaryCity(cleanValues.secondaryCity);
    setSecondaryState(cleanValues.secondaryState);
    setSecondaryZip(cleanValues.secondaryZip);
    setDrivingExperience(cleanValues.drivingExperience ?? []);
    setCurrentDrivingExperienceValue("");
    setAccidentHistory(cleanValues.accidentHistory ?? []);
    setCurrentAccidentHistoryValue("");
    setCriminalHistory(cleanValues.criminalHistory ?? []);
    setCurrentCriminalHistoryValue("");
    setEmploymentHistory(cleanValues.employmentHistory ?? []);
    setCurrentEmploymentHistoryValue("");
    setEmergencyContact(cleanValues.emergencyContact ?? []);
    setCurrentEmergencyContactValue("");
    setErrors({});
  };
  const [newDriverPersonalInfoRecord, setNewDriverPersonalInfoRecord] =
    React.useState(newDriverPersonalInfoModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getNewDriverPersonalInfo.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getNewDriverPersonalInfo
        : newDriverPersonalInfoModelProp;
      setNewDriverPersonalInfoRecord(record);
    };
    queryData();
  }, [idProp, newDriverPersonalInfoModelProp]);
  React.useEffect(resetStateValues, [newDriverPersonalInfoRecord]);
  const [currentDrivingExperienceValue, setCurrentDrivingExperienceValue] =
    React.useState("");
  const drivingExperienceRef = React.createRef();
  const [currentAccidentHistoryValue, setCurrentAccidentHistoryValue] =
    React.useState("");
  const accidentHistoryRef = React.createRef();
  const [currentCriminalHistoryValue, setCurrentCriminalHistoryValue] =
    React.useState("");
  const criminalHistoryRef = React.createRef();
  const [currentEmploymentHistoryValue, setCurrentEmploymentHistoryValue] =
    React.useState("");
  const employmentHistoryRef = React.createRef();
  const [currentEmergencyContactValue, setCurrentEmergencyContactValue] =
    React.useState("");
  const emergencyContactRef = React.createRef();
  const validations = {
    firstName: [{ type: "Required" }],
    lastName: [{ type: "Required" }],
    middleName: [],
    datOfBirth: [{ type: "Required" }],
    socialSecurityNumber: [{ type: "Required" }],
    primaryPhoneNumber: [{ type: "Required" }],
    altPhoneNumber: [],
    licenseNumber: [{ type: "Required" }],
    licenseCategory: [{ type: "Required" }],
    licenseState: [{ type: "Required" }],
    licenseExpirationDate: [{ type: "Required" }],
    primaryAddress: [{ type: "Required" }],
    primaryCity: [{ type: "Required" }],
    primaryState: [{ type: "Required" }],
    primaryZip: [{ type: "Required" }],
    secondaryAddress: [],
    secondaryCity: [],
    secondaryState: [],
    secondaryZip: [],
    drivingExperience: [{ type: "JSON" }],
    accidentHistory: [{ type: "JSON" }],
    criminalHistory: [{ type: "JSON" }],
    employmentHistory: [{ type: "JSON" }],
    emergencyContact: [{ type: "JSON" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          firstName,
          lastName,
          middleName: middleName ?? null,
          datOfBirth,
          socialSecurityNumber,
          primaryPhoneNumber,
          altPhoneNumber: altPhoneNumber ?? null,
          licenseNumber,
          licenseCategory,
          licenseState,
          licenseExpirationDate,
          primaryAddress,
          primaryCity,
          primaryState,
          primaryZip,
          secondaryAddress: secondaryAddress ?? null,
          secondaryCity: secondaryCity ?? null,
          secondaryState: secondaryState ?? null,
          secondaryZip: secondaryZip ?? null,
          drivingExperience: drivingExperience ?? null,
          accidentHistory: accidentHistory ?? null,
          criminalHistory: criminalHistory ?? null,
          employmentHistory: employmentHistory ?? null,
          emergencyContact: emergencyContact ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateNewDriverPersonalInfo.replaceAll("__typename", ""),
            variables: {
              input: {
                id: newDriverPersonalInfoRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NewDriverPersonalInfoUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Middle name"
        isRequired={false}
        isReadOnly={false}
        value={middleName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName: value,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.middleName ?? value;
          }
          if (errors.middleName?.hasError) {
            runValidationTasks("middleName", value);
          }
          setMiddleName(value);
        }}
        onBlur={() => runValidationTasks("middleName", middleName)}
        errorMessage={errors.middleName?.errorMessage}
        hasError={errors.middleName?.hasError}
        {...getOverrideProps(overrides, "middleName")}
      ></TextField>
      <TextField
        label="Dat of birth"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={datOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth: value,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.datOfBirth ?? value;
          }
          if (errors.datOfBirth?.hasError) {
            runValidationTasks("datOfBirth", value);
          }
          setDatOfBirth(value);
        }}
        onBlur={() => runValidationTasks("datOfBirth", datOfBirth)}
        errorMessage={errors.datOfBirth?.errorMessage}
        hasError={errors.datOfBirth?.hasError}
        {...getOverrideProps(overrides, "datOfBirth")}
      ></TextField>
      <TextField
        label="Social security number"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={socialSecurityNumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber: value,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.socialSecurityNumber ?? value;
          }
          if (errors.socialSecurityNumber?.hasError) {
            runValidationTasks("socialSecurityNumber", value);
          }
          setSocialSecurityNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("socialSecurityNumber", socialSecurityNumber)
        }
        errorMessage={errors.socialSecurityNumber?.errorMessage}
        hasError={errors.socialSecurityNumber?.hasError}
        {...getOverrideProps(overrides, "socialSecurityNumber")}
      ></TextField>
      <TextField
        label="Primary phone number"
        isRequired={true}
        isReadOnly={false}
        value={primaryPhoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber: value,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.primaryPhoneNumber ?? value;
          }
          if (errors.primaryPhoneNumber?.hasError) {
            runValidationTasks("primaryPhoneNumber", value);
          }
          setPrimaryPhoneNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("primaryPhoneNumber", primaryPhoneNumber)
        }
        errorMessage={errors.primaryPhoneNumber?.errorMessage}
        hasError={errors.primaryPhoneNumber?.hasError}
        {...getOverrideProps(overrides, "primaryPhoneNumber")}
      ></TextField>
      <TextField
        label="Alt phone number"
        isRequired={false}
        isReadOnly={false}
        value={altPhoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber: value,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.altPhoneNumber ?? value;
          }
          if (errors.altPhoneNumber?.hasError) {
            runValidationTasks("altPhoneNumber", value);
          }
          setAltPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("altPhoneNumber", altPhoneNumber)}
        errorMessage={errors.altPhoneNumber?.errorMessage}
        hasError={errors.altPhoneNumber?.hasError}
        {...getOverrideProps(overrides, "altPhoneNumber")}
      ></TextField>
      <TextField
        label="License number"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={licenseNumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber: value,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.licenseNumber ?? value;
          }
          if (errors.licenseNumber?.hasError) {
            runValidationTasks("licenseNumber", value);
          }
          setLicenseNumber(value);
        }}
        onBlur={() => runValidationTasks("licenseNumber", licenseNumber)}
        errorMessage={errors.licenseNumber?.errorMessage}
        hasError={errors.licenseNumber?.hasError}
        {...getOverrideProps(overrides, "licenseNumber")}
      ></TextField>
      <TextField
        label="License category"
        isRequired={true}
        isReadOnly={false}
        value={licenseCategory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory: value,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.licenseCategory ?? value;
          }
          if (errors.licenseCategory?.hasError) {
            runValidationTasks("licenseCategory", value);
          }
          setLicenseCategory(value);
        }}
        onBlur={() => runValidationTasks("licenseCategory", licenseCategory)}
        errorMessage={errors.licenseCategory?.errorMessage}
        hasError={errors.licenseCategory?.hasError}
        {...getOverrideProps(overrides, "licenseCategory")}
      ></TextField>
      <TextField
        label="License state"
        isRequired={true}
        isReadOnly={false}
        value={licenseState}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState: value,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.licenseState ?? value;
          }
          if (errors.licenseState?.hasError) {
            runValidationTasks("licenseState", value);
          }
          setLicenseState(value);
        }}
        onBlur={() => runValidationTasks("licenseState", licenseState)}
        errorMessage={errors.licenseState?.errorMessage}
        hasError={errors.licenseState?.hasError}
        {...getOverrideProps(overrides, "licenseState")}
      ></TextField>
      <TextField
        label="License expiration date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={licenseExpirationDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate: value,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.licenseExpirationDate ?? value;
          }
          if (errors.licenseExpirationDate?.hasError) {
            runValidationTasks("licenseExpirationDate", value);
          }
          setLicenseExpirationDate(value);
        }}
        onBlur={() =>
          runValidationTasks("licenseExpirationDate", licenseExpirationDate)
        }
        errorMessage={errors.licenseExpirationDate?.errorMessage}
        hasError={errors.licenseExpirationDate?.hasError}
        {...getOverrideProps(overrides, "licenseExpirationDate")}
      ></TextField>
      <TextField
        label="Primary address"
        isRequired={true}
        isReadOnly={false}
        value={primaryAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress: value,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.primaryAddress ?? value;
          }
          if (errors.primaryAddress?.hasError) {
            runValidationTasks("primaryAddress", value);
          }
          setPrimaryAddress(value);
        }}
        onBlur={() => runValidationTasks("primaryAddress", primaryAddress)}
        errorMessage={errors.primaryAddress?.errorMessage}
        hasError={errors.primaryAddress?.hasError}
        {...getOverrideProps(overrides, "primaryAddress")}
      ></TextField>
      <TextField
        label="Primary city"
        isRequired={true}
        isReadOnly={false}
        value={primaryCity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity: value,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.primaryCity ?? value;
          }
          if (errors.primaryCity?.hasError) {
            runValidationTasks("primaryCity", value);
          }
          setPrimaryCity(value);
        }}
        onBlur={() => runValidationTasks("primaryCity", primaryCity)}
        errorMessage={errors.primaryCity?.errorMessage}
        hasError={errors.primaryCity?.hasError}
        {...getOverrideProps(overrides, "primaryCity")}
      ></TextField>
      <TextField
        label="Primary state"
        isRequired={true}
        isReadOnly={false}
        value={primaryState}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState: value,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.primaryState ?? value;
          }
          if (errors.primaryState?.hasError) {
            runValidationTasks("primaryState", value);
          }
          setPrimaryState(value);
        }}
        onBlur={() => runValidationTasks("primaryState", primaryState)}
        errorMessage={errors.primaryState?.errorMessage}
        hasError={errors.primaryState?.hasError}
        {...getOverrideProps(overrides, "primaryState")}
      ></TextField>
      <TextField
        label="Primary zip"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={primaryZip}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip: value,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.primaryZip ?? value;
          }
          if (errors.primaryZip?.hasError) {
            runValidationTasks("primaryZip", value);
          }
          setPrimaryZip(value);
        }}
        onBlur={() => runValidationTasks("primaryZip", primaryZip)}
        errorMessage={errors.primaryZip?.errorMessage}
        hasError={errors.primaryZip?.hasError}
        {...getOverrideProps(overrides, "primaryZip")}
      ></TextField>
      <TextField
        label="Secondary address"
        isRequired={false}
        isReadOnly={false}
        value={secondaryAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress: value,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.secondaryAddress ?? value;
          }
          if (errors.secondaryAddress?.hasError) {
            runValidationTasks("secondaryAddress", value);
          }
          setSecondaryAddress(value);
        }}
        onBlur={() => runValidationTasks("secondaryAddress", secondaryAddress)}
        errorMessage={errors.secondaryAddress?.errorMessage}
        hasError={errors.secondaryAddress?.hasError}
        {...getOverrideProps(overrides, "secondaryAddress")}
      ></TextField>
      <TextField
        label="Secondary city"
        isRequired={false}
        isReadOnly={false}
        value={secondaryCity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity: value,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.secondaryCity ?? value;
          }
          if (errors.secondaryCity?.hasError) {
            runValidationTasks("secondaryCity", value);
          }
          setSecondaryCity(value);
        }}
        onBlur={() => runValidationTasks("secondaryCity", secondaryCity)}
        errorMessage={errors.secondaryCity?.errorMessage}
        hasError={errors.secondaryCity?.hasError}
        {...getOverrideProps(overrides, "secondaryCity")}
      ></TextField>
      <TextField
        label="Secondary state"
        isRequired={false}
        isReadOnly={false}
        value={secondaryState}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState: value,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.secondaryState ?? value;
          }
          if (errors.secondaryState?.hasError) {
            runValidationTasks("secondaryState", value);
          }
          setSecondaryState(value);
        }}
        onBlur={() => runValidationTasks("secondaryState", secondaryState)}
        errorMessage={errors.secondaryState?.errorMessage}
        hasError={errors.secondaryState?.hasError}
        {...getOverrideProps(overrides, "secondaryState")}
      ></TextField>
      <TextField
        label="Secondary zip"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={secondaryZip}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip: value,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            value = result?.secondaryZip ?? value;
          }
          if (errors.secondaryZip?.hasError) {
            runValidationTasks("secondaryZip", value);
          }
          setSecondaryZip(value);
        }}
        onBlur={() => runValidationTasks("secondaryZip", secondaryZip)}
        errorMessage={errors.secondaryZip?.errorMessage}
        hasError={errors.secondaryZip?.hasError}
        {...getOverrideProps(overrides, "secondaryZip")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience: values,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            values = result?.drivingExperience ?? values;
          }
          setDrivingExperience(values);
          setCurrentDrivingExperienceValue("");
        }}
        currentFieldValue={currentDrivingExperienceValue}
        label={"Driving experience"}
        items={drivingExperience}
        hasError={errors?.drivingExperience?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "drivingExperience",
            currentDrivingExperienceValue
          )
        }
        errorMessage={errors?.drivingExperience?.errorMessage}
        setFieldValue={setCurrentDrivingExperienceValue}
        inputFieldRef={drivingExperienceRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Driving experience"
          isRequired={false}
          isReadOnly={false}
          value={currentDrivingExperienceValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.drivingExperience?.hasError) {
              runValidationTasks("drivingExperience", value);
            }
            setCurrentDrivingExperienceValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "drivingExperience",
              currentDrivingExperienceValue
            )
          }
          errorMessage={errors.drivingExperience?.errorMessage}
          hasError={errors.drivingExperience?.hasError}
          ref={drivingExperienceRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "drivingExperience")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory: values,
              criminalHistory,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            values = result?.accidentHistory ?? values;
          }
          setAccidentHistory(values);
          setCurrentAccidentHistoryValue("");
        }}
        currentFieldValue={currentAccidentHistoryValue}
        label={"Accident history"}
        items={accidentHistory}
        hasError={errors?.accidentHistory?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "accidentHistory",
            currentAccidentHistoryValue
          )
        }
        errorMessage={errors?.accidentHistory?.errorMessage}
        setFieldValue={setCurrentAccidentHistoryValue}
        inputFieldRef={accidentHistoryRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Accident history"
          isRequired={false}
          isReadOnly={false}
          value={currentAccidentHistoryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.accidentHistory?.hasError) {
              runValidationTasks("accidentHistory", value);
            }
            setCurrentAccidentHistoryValue(value);
          }}
          onBlur={() =>
            runValidationTasks("accidentHistory", currentAccidentHistoryValue)
          }
          errorMessage={errors.accidentHistory?.errorMessage}
          hasError={errors.accidentHistory?.hasError}
          ref={accidentHistoryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "accidentHistory")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory: values,
              employmentHistory,
              emergencyContact,
            };
            const result = onChange(modelFields);
            values = result?.criminalHistory ?? values;
          }
          setCriminalHistory(values);
          setCurrentCriminalHistoryValue("");
        }}
        currentFieldValue={currentCriminalHistoryValue}
        label={"Criminal history"}
        items={criminalHistory}
        hasError={errors?.criminalHistory?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "criminalHistory",
            currentCriminalHistoryValue
          )
        }
        errorMessage={errors?.criminalHistory?.errorMessage}
        setFieldValue={setCurrentCriminalHistoryValue}
        inputFieldRef={criminalHistoryRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Criminal history"
          isRequired={false}
          isReadOnly={false}
          value={currentCriminalHistoryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.criminalHistory?.hasError) {
              runValidationTasks("criminalHistory", value);
            }
            setCurrentCriminalHistoryValue(value);
          }}
          onBlur={() =>
            runValidationTasks("criminalHistory", currentCriminalHistoryValue)
          }
          errorMessage={errors.criminalHistory?.errorMessage}
          hasError={errors.criminalHistory?.hasError}
          ref={criminalHistoryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "criminalHistory")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory: values,
              emergencyContact,
            };
            const result = onChange(modelFields);
            values = result?.employmentHistory ?? values;
          }
          setEmploymentHistory(values);
          setCurrentEmploymentHistoryValue("");
        }}
        currentFieldValue={currentEmploymentHistoryValue}
        label={"Employment history"}
        items={employmentHistory}
        hasError={errors?.employmentHistory?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "employmentHistory",
            currentEmploymentHistoryValue
          )
        }
        errorMessage={errors?.employmentHistory?.errorMessage}
        setFieldValue={setCurrentEmploymentHistoryValue}
        inputFieldRef={employmentHistoryRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Employment history"
          isRequired={false}
          isReadOnly={false}
          value={currentEmploymentHistoryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.employmentHistory?.hasError) {
              runValidationTasks("employmentHistory", value);
            }
            setCurrentEmploymentHistoryValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "employmentHistory",
              currentEmploymentHistoryValue
            )
          }
          errorMessage={errors.employmentHistory?.errorMessage}
          hasError={errors.employmentHistory?.hasError}
          ref={employmentHistoryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "employmentHistory")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              middleName,
              datOfBirth,
              socialSecurityNumber,
              primaryPhoneNumber,
              altPhoneNumber,
              licenseNumber,
              licenseCategory,
              licenseState,
              licenseExpirationDate,
              primaryAddress,
              primaryCity,
              primaryState,
              primaryZip,
              secondaryAddress,
              secondaryCity,
              secondaryState,
              secondaryZip,
              drivingExperience,
              accidentHistory,
              criminalHistory,
              employmentHistory,
              emergencyContact: values,
            };
            const result = onChange(modelFields);
            values = result?.emergencyContact ?? values;
          }
          setEmergencyContact(values);
          setCurrentEmergencyContactValue("");
        }}
        currentFieldValue={currentEmergencyContactValue}
        label={"Emergency contact"}
        items={emergencyContact}
        hasError={errors?.emergencyContact?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "emergencyContact",
            currentEmergencyContactValue
          )
        }
        errorMessage={errors?.emergencyContact?.errorMessage}
        setFieldValue={setCurrentEmergencyContactValue}
        inputFieldRef={emergencyContactRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Emergency contact"
          isRequired={false}
          isReadOnly={false}
          value={currentEmergencyContactValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.emergencyContact?.hasError) {
              runValidationTasks("emergencyContact", value);
            }
            setCurrentEmergencyContactValue(value);
          }}
          onBlur={() =>
            runValidationTasks("emergencyContact", currentEmergencyContactValue)
          }
          errorMessage={errors.emergencyContact?.errorMessage}
          hasError={errors.emergencyContact?.hasError}
          ref={emergencyContactRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "emergencyContact")}
        ></TextAreaField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || newDriverPersonalInfoModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || newDriverPersonalInfoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
