import * as yup from 'yup';

import { AppFieldConfig, extendSchema } from '../../app';

const base = {
  username: yup.string().required().min(4),
  password: yup.string().required(),
};

export const loginFieldConfig: AppFieldConfig = {
  username: {
    label: 'Username',
    required: true,
  },
  password: {
    label: 'Password',
    required: true,
  },
};

export const baseLoginFieldSchema = yup.object().shape(base);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const loginFieldSchema = <typeof baseLoginFieldSchema>(
  extendSchema(base, loginFieldConfig)
);
