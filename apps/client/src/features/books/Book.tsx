import { useQuery, gql } from '@apollo/client';
import { GetBookById, GetBookByIdVariables } from './__generated__/GetBookById';

const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    getBookById(id: $id) {
      title
      author {
        fullName
        lastName
      }
      id
    }
  }
`;

export const Book = () => {
  const { loading, error, data } = useQuery<GetBookById, GetBookByIdVariables>(
    GET_BOOK_BY_ID,
    {
      variables: { id: '1' },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);
  return (
    <div>
      Book: {data?.getBookById?.author} {data?.getBookById?.title}
    </div>
  );
};
