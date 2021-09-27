import { yupResolver } from '@hookform/resolvers/yup';
import { useOktaAuth } from '@okta/okta-react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { getFormOptions, getYupSchema } from '../../app';
import { AppFieldConfig } from '../../form';

import { LoginFieldValues } from '../helpers/authTypes';
import { getLoginOnSubmit } from '../helpers/getLoginOnSubmit';

export const loginFieldConfig: AppFieldConfig = {
  username: {
    label: 'Username',
    required: true,
    type: 'text',
    yupValidation: yup.string(),
  },
  password: {
    label: 'Password',
    required: true,
    type: 'password',
    yupValidation: yup.string(),
  },
};

/** abstract non-display logic for Login component */
export const useLogin = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  const { control, handleSubmit, formState, trigger } =
    useForm<LoginFieldValues>({
      resolver: yupResolver(getYupSchema(loginFieldConfig)),
    });

  const onSubmit = getLoginOnSubmit({
    oktaAuth,
    setSessionToken,
    setFormError,
    handleSubmit,
    formRef,
  });

  const formOptions = getFormOptions<LoginFieldValues>(
    loginFieldConfig,
    control,
    formState,
    trigger
  );

  return { sessionToken, formRef, onSubmit, formError, control, formOptions };
};
