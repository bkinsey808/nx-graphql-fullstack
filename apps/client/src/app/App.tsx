import { LoginCallback, SecureRoute } from '@okta/okta-react';
import { FC } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';

import { AppSecurity, Login } from '../features/auth';
import { Search } from '../features/search/Search';
import { AppTheme } from '../features/theme';

import { history } from './history';
import { LOGIN_CALLBACK_URL, LOGIN_URL } from './urls';
import { urqlClient } from './urqlClient';

export const App: FC = () => (
  <Router history={history}>
    <UrqlProvider value={urqlClient}>
      <AppTheme>
        <AppSecurity>
          <Switch>
            <Route exact path={LOGIN_URL} component={Login} />
            <Route path={`${LOGIN_CALLBACK_URL}`} component={LoginCallback} />
            {process.env.NX_REQUIRE_LOGIN === 'false' ? (
              <Route exact path="/" component={Search} />
            ) : (
              <SecureRoute exact path="/" component={Search} />
            )}
          </Switch>
        </AppSecurity>
      </AppTheme>
    </UrqlProvider>
  </Router>
);
