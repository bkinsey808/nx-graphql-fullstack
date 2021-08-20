import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { OktaAuth, OktaAuthOptions, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import { Login } from '../features/auth/Login';
import { Search } from '../features/search/Search';

import { client } from './client';
import { LOGIN_CALLBACK_URL, LOGIN_URL } from './urls';
import { useCustomTheme } from './useCustomTheme';

const history = createBrowserHistory();

export const App = () => {
  const theme = useCustomTheme();

  const config: OktaAuthOptions = {
    clientId: process.env.NX_OKTA_CLIENT_ID,
    issuer: `${process.env.NX_OKTA_URL}/oauth2/default`,
    redirectUri: `http://localhost:4200${LOGIN_CALLBACK_URL}`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const oktaAuth = new OktaAuth(config);

  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Security
            oktaAuth={oktaAuth}
            onAuthRequired={() => {
              // Redirect to the /login page that has a CustomLoginComponent
              history.push(LOGIN_URL);
            }}
            restoreOriginalUri={(_oktaAuth, originalUri) => {
              history.replace(
                toRelativeUrl(originalUri, window.location.origin)
              );
            }}
          >
            <Switch>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
              <Route exact path={LOGIN_URL} component={Login} />
              <Route path={`${LOGIN_CALLBACK_URL}`} component={LoginCallback} />
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
              <SecureRoute exact path="/" component={Search} />
            </Switch>
          </Security>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
};
