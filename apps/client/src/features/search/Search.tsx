import { useQuery, gql } from '@apollo/client';
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
  const { loading, error, data } = useQuery<
    GetSearchResults,
    GetSearchResultsVariables
  >(SEARCH, {
    variables: { contains: 'e' },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  return (
    <div>
      {data?.search?.map((searchResult) => (
        <div>
          {searchResult?.__typename === 'Book'
            ? searchResult.title
            : searchResult?.fullName}
        </div>
      ))}
    </div>
  );
};
