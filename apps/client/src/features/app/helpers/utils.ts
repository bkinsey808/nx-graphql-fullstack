import * as yup from 'yup';
import Lazy from 'yup/lib/Lazy';

import { AppFieldConfig, AppFieldOptions } from './appTypes';

/** typed version of Object.keys */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

export const yupBuilder = (fieldConfig: AppFieldConfig) => {
  const myBase = getKeys(fieldConfig).reduce((acc, fieldName) => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return yup.object().shape(myBase) as Lazy<any, unknown> | yup.AnyObjectSchema;
};

export const getFieldOptions = <ControlGenericType>(
  fieldConfig: AppFieldConfig,
  control: ControlGenericType
) => {
  return {
    ...fieldConfig,
    control,
  } as AppFieldOptions<ControlGenericType>;
};
