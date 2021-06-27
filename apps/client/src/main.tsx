import { StrictMode } from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { environment } from './environments/environment';
import { Book } from './features/books/Book';

const client = new ApolloClient({
  uri: environment.graphqlServer,
  cache: new InMemoryCache(),
});

render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Book />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
