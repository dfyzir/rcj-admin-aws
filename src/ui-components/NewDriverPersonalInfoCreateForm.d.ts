/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NewDriverPersonalInfoCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    datOfBirth?: string;
    primaryAddress?: string;
    primaryCity?: string;
    primaryState?: string;
    primaryZip?: number;
    socialSecurityNumber?: number;
    secondaryAddress?: string;
    secondaryCity?: string;
    secondaryState?: string;
    secondaryZip?: number;
    primaryPhoneNumber?: string;
    altPhoneNumber?: string;
    licenseNumber?: number;
    licenseCategory?: string;
    licenseState?: string;
    licenseExpirationDate?: string;
    drivingExperience?: string[];
    accidentHistory?: string[];
    criminalHistory?: string[];
    employmentHistory?: string[];
    emergencyContact?: string[];
};
export declare type NewDriverPersonalInfoCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    middleName?: ValidationFunction<string>;
    datOfBirth?: ValidationFunction<string>;
    primaryAddress?: ValidationFunction<string>;
    primaryCity?: ValidationFunction<string>;
    primaryState?: ValidationFunction<string>;
    primaryZip?: ValidationFunction<number>;
    socialSecurityNumber?: ValidationFunction<number>;
    secondaryAddress?: ValidationFunction<string>;
    secondaryCity?: ValidationFunction<string>;
    secondaryState?: ValidationFunction<string>;
    secondaryZip?: ValidationFunction<number>;
    primaryPhoneNumber?: ValidationFunction<string>;
    altPhoneNumber?: ValidationFunction<string>;
    licenseNumber?: ValidationFunction<number>;
    licenseCategory?: ValidationFunction<string>;
    licenseState?: ValidationFunction<string>;
    licenseExpirationDate?: ValidationFunction<string>;
    drivingExperience?: ValidationFunction<string>;
    accidentHistory?: ValidationFunction<string>;
    criminalHistory?: ValidationFunction<string>;
    employmentHistory?: ValidationFunction<string>;
    emergencyContact?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NewDriverPersonalInfoCreateFormOverridesProps = {
    NewDriverPersonalInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    middleName?: PrimitiveOverrideProps<TextFieldProps>;
    datOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    primaryAddress?: PrimitiveOverrideProps<TextFieldProps>;
    primaryCity?: PrimitiveOverrideProps<TextFieldProps>;
    primaryState?: PrimitiveOverrideProps<SelectFieldProps>;
    primaryZip?: PrimitiveOverrideProps<TextFieldProps>;
    socialSecurityNumber?: PrimitiveOverrideProps<TextFieldProps>;
    secondaryAddress?: PrimitiveOverrideProps<TextFieldProps>;
    secondaryCity?: PrimitiveOverrideProps<TextFieldProps>;
    secondaryState?: PrimitiveOverrideProps<TextFieldProps>;
    secondaryZip?: PrimitiveOverrideProps<TextFieldProps>;
    primaryPhoneNumber?: PrimitiveOverrideProps<TextFieldProps>;
    altPhoneNumber?: PrimitiveOverrideProps<TextFieldProps>;
    licenseNumber?: PrimitiveOverrideProps<TextFieldProps>;
    licenseCategory?: PrimitiveOverrideProps<TextFieldProps>;
    licenseState?: PrimitiveOverrideProps<TextFieldProps>;
    licenseExpirationDate?: PrimitiveOverrideProps<TextFieldProps>;
    drivingExperience?: PrimitiveOverrideProps<TextAreaFieldProps>;
    accidentHistory?: PrimitiveOverrideProps<TextAreaFieldProps>;
    criminalHistory?: PrimitiveOverrideProps<TextAreaFieldProps>;
    employmentHistory?: PrimitiveOverrideProps<TextAreaFieldProps>;
    emergencyContact?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type NewDriverPersonalInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: NewDriverPersonalInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NewDriverPersonalInfoCreateFormInputValues) => NewDriverPersonalInfoCreateFormInputValues;
    onSuccess?: (fields: NewDriverPersonalInfoCreateFormInputValues) => void;
    onError?: (fields: NewDriverPersonalInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NewDriverPersonalInfoCreateFormInputValues) => NewDriverPersonalInfoCreateFormInputValues;
    onValidate?: NewDriverPersonalInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function NewDriverPersonalInfoCreateForm(props: NewDriverPersonalInfoCreateFormProps): React.ReactElement;
