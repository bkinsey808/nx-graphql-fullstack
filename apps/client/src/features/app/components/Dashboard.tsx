import { CardContent, Grid, Card } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { FC } from 'react';
import { Provider as UrqlProvider } from 'urql';

import { urqlClient } from '../../app';
import { Search } from '../../search/Search';
import { ThemeSelect } from '../../theme';

export const Dashboard: FC = () => {
  const { oktaAuth } = useOktaAuth();

  return (
    <UrqlProvider value={urqlClient}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} item>
              <ThemeSelect />
            </Grid>
            <Grid item>
              <Search />
            </Grid>
          </Grid>
          <button
            onClick={() => {
              void oktaAuth.signOut();
            }}
          >
            Sign Out
          </button>
        </CardContent>
      </Card>
    </UrqlProvider>
  );
};

// needed because of lazy loading
export default Dashboard;
