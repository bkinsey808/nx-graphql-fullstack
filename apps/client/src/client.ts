import { ApolloClient } from '@apollo/client';

import { cache } from './cache';
import { environment } from './environments/environment';

export const client = new ApolloClient({
  uri: environment.graphqlServer,
  cache,
});
