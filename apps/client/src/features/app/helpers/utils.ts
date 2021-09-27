import { MutableRefObject } from 'react';
import {
  Control,
  DeepMap,
  DeepPartial,
  UnionLike,
  FieldError,
  FormState,
  UseFormTrigger,
} from 'react-hook-form/dist/types';
import * as yup from 'yup';
import Lazy from 'yup/lib/Lazy';

import { AppFieldConfig, AppFormOptions } from './appTypes';

/** typed version of Object.keys */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

/** given a fieldConfig, generate yup fields that will be used to generate the yup validation */
const getYupFields = (fieldConfig: AppFieldConfig) =>
  getKeys(fieldConfig).reduce((acc, fieldName) => {
    let yupField = fieldConfig[fieldName as string].yupValidation;
    if (fieldConfig[fieldName as string].required) {
      yupField = yupField.required();
    }
    if (fieldConfig[fieldName as string].label) {
      yupField = yupField.label(fieldConfig[fieldName as string].label);
    }
    acc[fieldName] = yupField;
    return acc;
  }, {} as { [fieldName: string]: yup.StringSchema<string | undefined> });

/** given a fieldConfig, generate yup validation schema used by yupResolver */
export const getYupSchema = (fieldConfig: AppFieldConfig) => {
  const yupFields = getYupFields(fieldConfig);
  return yup.object().shape(yupFields) as
    | Lazy<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any,
        unknown
      >
    | yup.AnyObjectSchema;
};

/** add the control to the fieldConfig for consumption by field components */
export const getFormOptions = <FieldValues>(
  fieldConfig: AppFieldConfig,
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FieldValues, object>,
  formState: FormState<FieldValues>,
  trigger: UseFormTrigger<FieldValues>
) => {
  return {
    fieldConfig,
    control,
    formState,
    trigger,
  } as AppFormOptions<FieldValues>;
};

export const getHelperText = <FormFieldTypes>(
  fieldName: string,
  formState: FormState<FormFieldTypes>
) =>
  (
    formState.errors[
      fieldName as unknown as keyof DeepMap<
        DeepPartial<UnionLike<FormFieldTypes>>,
        FieldError
      >
    ] as { message?: string }
  )?.message;

export const getHasError = <FormFieldTypes>(
  fieldName: string,
  formState: FormState<FormFieldTypes>
) => {
  const hasHelperText = !!getHelperText(fieldName, formState);
  const isSubmitted = formState.isSubmitted;
  const isDirty =
    !!formState.dirtyFields[
      fieldName as unknown as keyof DeepMap<
        DeepPartial<UnionLike<FormFieldTypes>>,
        true
      >
    ];

  if (isSubmitted && !isDirty && hasHelperText) {
    return true;
  }
  return isDirty && hasHelperText;
};

export const getErrorHandler =
  (formRef: MutableRefObject<HTMLFormElement | null>) =>
  (errors: { [fieldName: string]: FieldError }) => {
    console.log({ formRef });
    console.log({ errors });
    const elements = formRef?.current?.elements || [];
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const name = el.getAttribute('name');
      if (name && name in errors) {
        (el as HTMLElement).focus();
        break;
      }
    }
  };
