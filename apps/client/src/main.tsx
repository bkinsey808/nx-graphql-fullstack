import { StrictMode } from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

import { environment } from './environments/environment';
import { HelloWorld } from './__generated__/HelloWorld';
import App from './app/app';
import { GetBooks } from './__generated__/GetBooks';
import { GetBookById, GetBookByIdVariables } from './__generated__/GetBookById';

const HELLO_WORLD = gql`
  query HelloWorld {
    hello
  }
`;

const BOOKS = gql`
  query GetBooks {
    books {
      author
      title
    }
  }
`;

const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    getBookById(id: $id) {
      title
      author
      id
    }
  }
`;

const HelloWorldDisplay = () => {
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
      {/* {data?.books?.map((book, index) => ( */}
      {/* <div key={index}> */}
      Book: {data?.getBookById?.author} {data?.getBookById?.title}
      {/* </div> */}
      {/* ))} */}
    </div>
  );
};

const client = new ApolloClient({
  uri: environment.graphqlServer,
  cache: new InMemoryCache(),
});

render(
  <StrictMode>
    <ApolloProvider client={client}>
      <HelloWorldDisplay />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
