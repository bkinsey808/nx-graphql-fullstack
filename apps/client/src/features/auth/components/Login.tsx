import { Alert, Button } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AppTextField } from '../../../components/AppTextField';
import { LoginFieldValues } from '../helpers/authTypes';
import { getLoginOnSubmit } from '../helpers/getLoginOnSubmit';

export const Login: FC = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const { control, handleSubmit } = useForm<LoginFieldValues>();

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form
      onSubmit={getLoginOnSubmit({
        oktaAuth,
        setSessionToken,
        setFormError,
        handleSubmit,
      })}
    >
      {formError && <Alert severity="error">{formError}</Alert>}
      <AppTextField<LoginFieldValues>
        name="username"
        label="Username"
        control={control}
      />
      <AppTextField<LoginFieldValues>
        label="Password"
        name="password"
        type="password"
        control={control}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

// needed because of lazy loading
export default Login;
