import * as yup from 'yup';

import { AppFieldConfig } from './appTypes';

/** typed version of Object.keys */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

// eslint-disable-next-line @typescript-eslint/ban-types
export const extendSchema = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldSchema: any,
  fieldConfig: AppFieldConfig
) => {
  getKeys(fieldSchema).forEach((fieldName) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const label = fieldConfig[fieldName as any].label;
    if (label) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fieldSchema[fieldName] = fieldSchema[fieldName].label(label);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (fieldConfig[fieldName as any].required) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fieldSchema[fieldName] = fieldSchema[fieldName].required();
    }
  });
  return yup.object().shape(fieldSchema) as unknown as T;
};
