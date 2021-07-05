import { gql, useLazyQuery } from '@apollo/client';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <>
      <input
        onChange={({ target: { value } }) =>
          search({ variables: { contains: value } })
        }
        type="text"
      />
      <div>
        {data?.search?.map((searchResult) => (
          <div>
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
