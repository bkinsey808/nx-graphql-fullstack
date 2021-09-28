import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@mui/material';
import { FC } from 'react';

import { AppForm, AppTextField } from '../../form';
import { LoginFieldValues } from '../helpers/authTypes';
import { useLogin } from '../hooks/useLogin';

export const LoginForm: FC = () => {
  const { sessionToken, formRef, onSubmit, formError, formOptions } =
    useLogin();

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <AppForm ref={formRef} onSubmit={onSubmit} formError={formError}>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <AppTextField<LoginFieldValues>
            name="username"
            formOptions={formOptions}
          />
          <AppTextField<LoginFieldValues>
            name="password"
            formOptions={formOptions}
          />
        </CardContent>
        <CardActions>
          <Button type="submit">Submit</Button>
        </CardActions>
      </Card>
    </AppForm>
  );
};
