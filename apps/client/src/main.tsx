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
import { Books } from './__generated__/Books';

const HELLO_WORLD = gql`
  query HelloWorld {
    hello
  }
`;

const BOOKS = gql`
  query Books {
    books {
      author
      title
    }
  }
`;

const HelloWorldDisplay = () => {
  const { loading, error, data } = useQuery<Books>(BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

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
