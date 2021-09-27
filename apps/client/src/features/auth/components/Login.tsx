import { Button } from '@mui/material';
import { FC, useRef } from 'react';

import { AppForm, AppTextField } from '../../form';
import { LoginFieldValues } from '../helpers/authTypes';
import { useLogin } from '../hooks/useLogin';

export const Login: FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { sessionToken, onSubmit, formError, formOptions } = useLogin(formRef);

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <AppForm ref={formRef} onSubmit={onSubmit} formError={formError}>
      <AppTextField<LoginFieldValues>
        name="username"
        formOptions={formOptions}
      />
      <AppTextField<LoginFieldValues>
        name="password"
        formOptions={formOptions}
      />
      <Button type="submit">Submit</Button>
    </AppForm>
  );
};

// needed because of lazy loading
export default Login;
