import { Alert, Button } from '@mui/material';
import { FC } from 'react';

import { AppTextField } from '../../app';
import { loginFieldConfig } from '../helpers/authConsts';
import { LoginFieldValues } from '../helpers/authTypes';
import { useLogin } from '../hooks/useLogin';

export const Login: FC = () => {
  const { sessionToken, onSubmit, formError, control } = useLogin();

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form onSubmit={onSubmit}>
      {formError && <Alert severity="error">{formError}</Alert>}
      <AppTextField<LoginFieldValues>
        name="username"
        fieldConfig={loginFieldConfig}
        control={control}
      />
      <AppTextField<LoginFieldValues>
        name="password"
        type="password"
        fieldConfig={loginFieldConfig}
        control={control}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

// needed because of lazy loading
export default Login;
