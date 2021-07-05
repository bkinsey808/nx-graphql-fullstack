import { gql, useLazyQuery } from '@apollo/client';
import { SearchInput } from './SearchInput';
import {
  GetSearchResults,
  GetSearchResultsVariables,
} from './__generated__/GetSearchResults';

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

  return (
    <>
      <SearchInput search={search} />
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
      <div>
        {data?.search?.map((searchResult, index) => (
          <div key={index}>
            {searchResult?.__typename === 'Book' ? (
              <div>{searchResult.title}</div>
            ) : (
              <div>{searchResult?.fullName}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};