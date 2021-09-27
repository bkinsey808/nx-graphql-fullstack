import { yupResolver } from '@hookform/resolvers/yup';
import { useOktaAuth } from '@okta/okta-react';
import { useState, MutableRefObject } from 'react';
import { useForm } from 'react-hook-form';

import { getFormOptions } from '../../app';
import { loginFieldConfig, loginFieldSchema } from '../helpers/authConsts';
import { LoginFieldValues } from '../helpers/authTypes';
import { getLoginOnSubmit } from '../helpers/getLoginOnSubmit';

/** abstract non-display logic for Login component */
export const useLogin = (formRef: MutableRefObject<HTMLFormElement | null>) => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  const { control, handleSubmit, formState, trigger } =
    useForm<LoginFieldValues>({
      resolver: yupResolver(loginFieldSchema),
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

  return { sessionToken, onSubmit, formError, control, formOptions };
};
