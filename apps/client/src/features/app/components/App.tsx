import { LoginCallback, SecureRoute } from '@okta/okta-react';
import { FC, lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { AppSecurity } from '../../auth';
import { AppTheme } from '../../theme';

import { history } from '../helpers/history';
import { LOGIN_CALLBACK_URL, LOGIN_URL } from '../helpers/urls';

const Login = lazy(() => import('../../auth/components/Login'));
const Dashboard = lazy(() => import('./Dashboard'));

export const App: FC = () => (
  <Router history={history}>
    <AppTheme>
      <AppSecurity>
        <Suspense fallback={<>Loading...</>}>
          <Switch>
            <Route exact path={LOGIN_URL} component={Login} />
            <Route path={`${LOGIN_CALLBACK_URL}`} component={LoginCallback} />
            {process.env.NX_REQUIRE_LOGIN === 'false' ? (
              <Route exact path="/" component={Dashboard} />
            ) : (
              <SecureRoute exact path="/" component={Dashboard} />
            )}
          </Switch>
        </Suspense>
      </AppSecurity>
    </AppTheme>
  </Router>
);
