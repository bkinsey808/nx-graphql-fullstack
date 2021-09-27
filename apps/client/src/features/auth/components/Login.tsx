import { Alert, Button } from '@mui/material';
import { FC, useRef } from 'react';

import { AppTextField } from '../../app';
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
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {formError && <Alert severity="error">{formError}</Alert>}
      <AppTextField<LoginFieldValues>
        name="username"
        formOptions={formOptions}
      />
      <AppTextField<LoginFieldValues>
        name="password"
        formOptions={formOptions}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

// needed because of lazy loading
export default Login;
