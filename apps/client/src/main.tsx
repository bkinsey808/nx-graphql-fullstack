import { render } from 'react-dom';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import { environment } from './environments/environment';
import { App } from './app/app';
import { cache } from './cache';

const client = new ApolloClient({
  uri: environment.graphqlServer,
  cache,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
