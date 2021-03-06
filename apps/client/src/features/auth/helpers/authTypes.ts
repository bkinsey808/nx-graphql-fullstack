import { OktaAuth } from '@okta/okta-auth-js';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types';

// Unfortunately, yup.InferType does not work properly with the way I did getYupSchema
export interface LoginFieldValues {
  username: string;
  password: string;
}

export interface GetLoginOnSubmitOptions {
  oktaAuth: OktaAuth;
  setSessionToken: Dispatch<SetStateAction<string | undefined>>;
  setFormError: Dispatch<SetStateAction<string | undefined>>;
  handleSubmit: UseFormHandleSubmit<LoginFieldValues>;
  formRef: MutableRefObject<HTMLFormElement | null>;
}

export type GetOnValidSubmitHandler = (
  options: Omit<GetLoginOnSubmitOptions, 'handleSubmit' | 'formRef'>
) => (loginFieldValues: LoginFieldValues) => Promise<void>;

export type GetLoginOnSubmit = (options: GetLoginOnSubmitOptions) => () => void;
