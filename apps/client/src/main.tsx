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
import App from './app/app';

const HELLO_WORLD = gql`
  query HelloWorld {
    hello
  }
`;

const HelloWorld = () => {
  const { loading, error, data } = useQuery(HELLO_WORLD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log({ data });
  return <div>Hello, {data.hello}</div>;
};

const client = new ApolloClient({
  uri: environment.graphqlServer,
  cache: new InMemoryCache(),
});

render(
  <StrictMode>
    <ApolloProvider client={client}>
      <HelloWorld />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
