import { OktaAuth } from '@okta/okta-auth-js';
import { Dispatch, SetStateAction } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types';

export interface LoginFieldValues {
  username: string;
  password: string;
}

export type LoginHandleError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  setFormError: Dispatch<SetStateAction<string | undefined>>
) => void;

export interface GetLoginOnSubmitOptions {
  oktaAuth: OktaAuth;
  setSessionToken: Dispatch<SetStateAction<string | undefined>>;
  setFormError: Dispatch<SetStateAction<string | undefined>>;
  handleSubmit: UseFormHandleSubmit<LoginFieldValues>;
}

export type GetOnValidSubmitHandler = (
  options: Omit<GetLoginOnSubmitOptions, 'handleSubmit'>
) => (loginFieldValues: LoginFieldValues) => Promise<void>;

export type GetLoginOnSubmit = (options: GetLoginOnSubmitOptions) => () => void;
