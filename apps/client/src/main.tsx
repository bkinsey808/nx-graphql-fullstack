import { ApolloProvider } from '@apollo/client';
import { render } from 'react-dom';

import { App } from './app/app';
import { client } from './client';

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
