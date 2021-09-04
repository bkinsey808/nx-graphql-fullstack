import { useState } from 'react';
import { gql, useQuery } from 'urql';

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

  const [{ fetching, error, data }] = useQuery<
    GetSearchResults,
    GetSearchResultsVariables
  >({
    query: SearchQuery,
    variables: { contains },
  });

  return (
    <>
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
    </>
  );
};
