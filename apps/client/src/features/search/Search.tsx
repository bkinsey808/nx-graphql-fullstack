import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { useOktaAuth } from '@okta/okta-react';

import { useState } from 'react';
import { gql, useQuery } from 'urql';

import { ThemeSelect } from '../theme/components/ThemeSelect';

import {
  GetSearchResults,
  GetSearchResultsVariables,
} from './__generated__/GetSearchResults';
import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';

const SearchQuery = gql`
  query GetSearchResults($contains: String!) {
    search(contains: $contains) {
      ... on Book {
        __typename
        id
        title
      }
      ... on Author {
        __typename
        id
        fullName
      }
    }
  }
`;

export const Search = () => {
  const [contains, setContains] = useState('');
  const { oktaAuth } = useOktaAuth();

  const [{ fetching, error, data }] = useQuery<
    GetSearchResults,
    GetSearchResultsVariables
  >({
    query: SearchQuery,
    variables: { contains },
  });

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <ThemeSelect />
          </Grid>
          <Grid item>
            <SearchForm setContains={setContains} />
            {!data ? (
              <div>No results.</div>
            ) : (
              <SearchResults
                searchResults={
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  data?.search
                }
              />
            )}
            {fetching && <div>Loading</div>}
            {error && !fetching && <div>Error {JSON.stringify(error)}</div>}
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
  );
};
