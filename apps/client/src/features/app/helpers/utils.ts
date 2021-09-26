import { Control } from 'react-hook-form/dist/types';
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
    let yupString = fieldConfig[fieldName as string].yupValidation;
    if (fieldConfig[fieldName as string].required) {
      yupString = yupString.required();
    }
    if (fieldConfig[fieldName as string].label) {
      yupString = yupString.label(fieldConfig[fieldName as string].label);
    }
    acc[fieldName] = yupString;
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
  control: Control<FieldValues, object>
) => {
  return {
    fieldConfig,
    control,
  } as AppFormOptions<FieldValues>;
};
