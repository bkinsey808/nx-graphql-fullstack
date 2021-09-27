import * as yup from 'yup';

import { AppFieldConfig, getYupSchema } from '../../form';

export const loginFieldConfig: AppFieldConfig = {
  username: {
    label: 'Username',
    required: true,
    type: 'text',
    yupValidation: yup.string().required().min(4),
  },
  password: {
    label: 'Password',
    required: true,
    type: 'password',
    yupValidation: yup.string().required(),
  },
};

export const loginFieldSchema = getYupSchema(loginFieldConfig);
