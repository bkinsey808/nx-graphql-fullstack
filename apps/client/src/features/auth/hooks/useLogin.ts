import { yupResolver } from '@hookform/resolvers/yup';
import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { getFormOptions } from '../../app';
import { loginFieldConfig, loginFieldSchema } from '../helpers/authConsts';
import { LoginFieldValues } from '../helpers/authTypes';
import { getLoginOnSubmit } from '../helpers/getLoginOnSubmit';

/** abstract non-display logic for Login component */
export const useLogin = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  const { control, handleSubmit } = useForm<LoginFieldValues>({
    resolver: yupResolver(loginFieldSchema),
  });

  const onSubmit = getLoginOnSubmit({
    oktaAuth,
    setSessionToken,
    setFormError,
    handleSubmit,
  });

  console.log(JSON.stringify(control));
  const fieldOptions = getFormOptions<LoginFieldValues>(
    loginFieldConfig,
    control
  );

  return { sessionToken, onSubmit, formError, control, fieldOptions };
};
