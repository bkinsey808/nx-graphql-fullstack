import { Alert } from '@mui/material';
import { forwardRef, ReactNode } from 'react';

interface AppFormProps {
  onSubmit: () => void;
  formError?: string;
  children: ReactNode;
}

export const AppForm = forwardRef<
  HTMLFormElement,
  AppFormProps
  // eslint-disable-next-line react/prop-types
>(({ onSubmit, formError, children }, formRef) => {
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {formError && <Alert severity="error">{formError}</Alert>}
      {children}
    </form>
  );
});
AppForm.displayName = 'AppForm';
