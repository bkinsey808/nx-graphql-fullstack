import { Card, CardContent, Stack } from '@mui/material';
import { FC } from 'react';

import { LoginForm } from './LoginForm';

export const LoginPage: FC = () => {
  return (
    <Stack
      sx={{
        height: '100vh',
        backgroundColor: (theme) => theme.palette.grey[50],
        pt: '25vh',
        alignItems: 'center',
      }}
    >
      <LoginForm />
    </Stack>
  );
};

// needed because of lazy loading
export default LoginPage;
