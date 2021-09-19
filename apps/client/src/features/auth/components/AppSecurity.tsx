import { OktaAuth, OktaAuthOptions, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { FC } from 'react';

import { history } from '../../../app/history';
import { LOGIN_CALLBACK_URL, LOGIN_URL } from '../../../app/urls';

export const AppSecurity: FC = ({ children }) => {
  const config: OktaAuthOptions = {
    clientId: process.env.NX_OKTA_CLIENT_ID,
    issuer: `${process.env.NX_OKTA_URL}/oauth2/default`,
    redirectUri: `http://localhost:4200${LOGIN_CALLBACK_URL}`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  };

  const oktaAuth = new OktaAuth(config);

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={() => {
        // Redirect to the /login page that has a CustomLoginComponent
        history.push(LOGIN_URL);
      }}
      restoreOriginalUri={(_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri, window.location.origin));
      }}
    >
      {children}
    </Security>
  );
};
