import { useQuery, gql } from '@apollo/client';

import { GetBooks } from './__generated__/GetBooks';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      author {
        fullName
        firstName
        lastName
      }
      title
    }
  }
`;

export const AllBooks = () => {
  const { loading, error, data } = useQuery<GetBooks>(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);
  return (
    <div>
      {data?.books?.map((book, index) => (
        <div key={index}>
          Book: {book?.author} {book?.title}
        </div>
      ))}
    </div>
  );
};
