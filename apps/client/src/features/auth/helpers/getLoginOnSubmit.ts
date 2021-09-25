import type { SigninWithRedirectOptions } from '@okta/okta-auth-js/lib/types';

import {
  GetLoginOnSubmit,
  GetOnValidSubmitHandler,
  LoginHandleError,
} from './authTypes';

const loginHandleError: LoginHandleError = (err, setFormError) => {
  if ('errorSummary' in err) {
    setFormError(err.errorSummary);
  } else {
    setFormError(JSON.stringify(err));
  }
};

const getOnValidSubmitHandler: GetOnValidSubmitHandler =
  ({ oktaAuth, setSessionToken, setFormError }) =>
  async ({ username, password }) => {
    try {
      const res = await oktaAuth.signInWithCredentials({
        username,
        password,
      });
      const { sessionToken } = res;
      setSessionToken(sessionToken);
      const signinWithRedirectOptions = {
        sessionToken,
      } as SigninWithRedirectOptions;
      // sessionToken is a one-use token, so make sure this is only called once
      void oktaAuth.signInWithRedirect(signinWithRedirectOptions);
    } catch (err) {
      loginHandleError(err, setFormError);
    }
  };

/** handleSubmit from RHF takes an onValid submit handler */
export const getLoginOnSubmit: GetLoginOnSubmit = ({
  oktaAuth,
  setSessionToken,
  setFormError,
  handleSubmit,
}) => {
  return handleSubmit(
    // this means the form itself is valid (on the client side)
    getOnValidSubmitHandler({ oktaAuth, setSessionToken, setFormError }),
    (errors) => {
      console.log({ errors });
    }
  );
};
