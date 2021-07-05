import { StrictMode } from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { environment } from './environments/environment';
import { Search } from './features/search/Search';

const client = new ApolloClient({
  uri: environment.graphqlServer,
  cache: new InMemoryCache(),
});

render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Search />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
