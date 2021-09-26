import { Dispatch, SetStateAction } from 'react';
import { Control } from 'react-hook-form/dist/types';
import * as yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';

// see https://stackoverflow.com/questions/58216298/how-to-omit-keystring-any-from-a-type-in-typescript#69299668
export type NoStringIndex<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};

export interface AppFieldConfig {
  [fieldName: string]: {
    label: string;
    required?: boolean;
    type: 'text' | 'password';
    yupValidation: //eslint-disable-next-line @typescript-eslint/no-explicit-any
    | RequiredStringSchema<string | undefined, Record<string, any>>
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      | yup.StringSchema<string | undefined, Record<string, any>>;
  };
}

export type AppFormOptions<FieldValues> = {
  fieldConfig: AppFieldConfig;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FieldValues, object>;
};

export type AppFormHandleError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  setFormError: Dispatch<SetStateAction<string | undefined>>
) => void;
