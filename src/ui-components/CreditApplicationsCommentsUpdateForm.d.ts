/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { CreditApplicationsComments } from "../API.ts";
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
export declare type CreditApplicationsCommentsUpdateFormInputValues = {
    text?: string;
    createdAt?: string;
    author?: string;
    fileId?: string;
};
export declare type CreditApplicationsCommentsUpdateFormValidationValues = {
    text?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    fileId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreditApplicationsCommentsUpdateFormOverridesProps = {
    CreditApplicationsCommentsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    fileId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CreditApplicationsCommentsUpdateFormProps = React.PropsWithChildren<{
    overrides?: CreditApplicationsCommentsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    creditApplicationsComments?: CreditApplicationsComments;
    onSubmit?: (fields: CreditApplicationsCommentsUpdateFormInputValues) => CreditApplicationsCommentsUpdateFormInputValues;
    onSuccess?: (fields: CreditApplicationsCommentsUpdateFormInputValues) => void;
    onError?: (fields: CreditApplicationsCommentsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CreditApplicationsCommentsUpdateFormInputValues) => CreditApplicationsCommentsUpdateFormInputValues;
    onValidate?: CreditApplicationsCommentsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CreditApplicationsCommentsUpdateForm(props: CreditApplicationsCommentsUpdateFormProps): React.ReactElement;
