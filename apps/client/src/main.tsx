import { ApolloClient, ApolloProvider } from '@apollo/client';
import { render } from 'react-dom';

import { App } from './app/app';
import { cache } from './cache';
import { environment } from './environments/environment';

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
