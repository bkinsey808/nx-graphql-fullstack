import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoginFieldValues } from '../helpers/authTypes';
import { getLoginOnSubmit } from '../helpers/getLoginOnSubmit';

export const useLogin = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const { control, handleSubmit } = useForm<LoginFieldValues>();

  const onSubmit = getLoginOnSubmit({
    oktaAuth,
    setSessionToken,
    setFormError,
    handleSubmit,
  });

  return { sessionToken, onSubmit, formError, control };
};
