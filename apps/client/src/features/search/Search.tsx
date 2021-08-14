import { gql, QueryLazyOptions, useLazyQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import debounce from 'lodash/debounce';
import { useCallback, useEffect } from 'react';

import { ThemeSelect } from '../theme/ThemeSelect';

import {
  GetSearchResults,
  GetSearchResultsVariables,
} from './__generated__/GetSearchResults';
import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';

const SEARCH = gql`
  query GetSearchResults($contains: String!) {
    search(contains: $contains) {
      ... on Book {
        __typename
        title
      }
      ... on Author {
        __typename
        fullName
      }
    }
  }
`;

export const Search = () => {
  const [search, { loading, error, data }] = useLazyQuery<
    GetSearchResults,
    GetSearchResultsVariables
  >(SEARCH);

  const debouncedSearch = useCallback(
    (options?: QueryLazyOptions<GetSearchResultsVariables>) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
      debounce(search, 100)(options),
    [search]
  );

  useEffect(() => {
    debouncedSearch({ variables: { contains: '' } });
  }, [debouncedSearch]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <ThemeSelect />
          </Grid>
          <Grid item>
            <SearchForm search={debouncedSearch} />
            {!data?.search?.length ? (
              <div>No results.</div>
            ) : (
              <SearchResults searchResults={data.search} />
            )}
            {loading && <div>Loading</div>}
            {error && !loading && <div>Error {JSON.stringify(error)}</div>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
