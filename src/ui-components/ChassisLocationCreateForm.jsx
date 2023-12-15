/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createChassisLocation } from "../graphql/mutations";
const client = generateClient();
export default function ChassisLocationCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    chassisNumber: "",
    location: "",
    container: "",
  };
  const [chassisNumber, setChassisNumber] = React.useState(
    initialValues.chassisNumber
  );
  const [location, setLocation] = React.useState(initialValues.location);
  const [container, setContainer] = React.useState(initialValues.container);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setChassisNumber(initialValues.chassisNumber);
    setLocation(initialValues.location);
    setContainer(initialValues.container);
    setErrors({});
  };
  const validations = {
    chassisNumber: [{ type: "Required" }],
    location: [],
    container: [],
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
          chassisNumber,
          location,
          container,
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
            query: createChassisLocation.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ChassisLocationCreateForm")}
      {...rest}
    >
      <TextField
        label="Chassis number"
        isRequired={true}
        isReadOnly={false}
        value={chassisNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chassisNumber: value,
              location,
              container,
            };
            const result = onChange(modelFields);
            value = result?.chassisNumber ?? value;
          }
          if (errors.chassisNumber?.hasError) {
            runValidationTasks("chassisNumber", value);
          }
          setChassisNumber(value);
        }}
        onBlur={() => runValidationTasks("chassisNumber", chassisNumber)}
        errorMessage={errors.chassisNumber?.errorMessage}
        hasError={errors.chassisNumber?.hasError}
        {...getOverrideProps(overrides, "chassisNumber")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chassisNumber,
              location: value,
              container,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Container"
        isRequired={false}
        isReadOnly={false}
        value={container}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chassisNumber,
              location,
              container: value,
            };
            const result = onChange(modelFields);
            value = result?.container ?? value;
          }
          if (errors.container?.hasError) {
            runValidationTasks("container", value);
          }
          setContainer(value);
        }}
        onBlur={() => runValidationTasks("container", container)}
        errorMessage={errors.container?.errorMessage}
        hasError={errors.container?.hasError}
        {...getOverrideProps(overrides, "container")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
