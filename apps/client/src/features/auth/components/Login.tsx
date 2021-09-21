import { Alert, Button } from '@mui/material';
import { SigninWithRedirectOptions } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AppTextField } from '../../../components/AppTextField';

interface LoginFieldValues {
  username: string;
  password: string;
}

export const Login: FC = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const { control, handleSubmit } = useForm<LoginFieldValues>();

  const onSubmit = async ({ username, password }: LoginFieldValues) => {
    try {
      const res = await oktaAuth.signInWithCredentials({ username, password });
      setSessionToken(res.sessionToken);
      // sessionToken is a one-use token, so make sure this is only called once
      void oktaAuth.signInWithRedirect({
        sessionToken: res.sessionToken,
      } as SigninWithRedirectOptions);
    } catch (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      err: any
    ) {
      if (err?.errorSummary) {
        setFormError(err.message);
      } else {
        setFormError(JSON.stringify(err));
      }
    }
  };

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
