import { ApolloClient, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

import { environment } from '../environments/environment';

import { cache } from './cache';

export const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: environment.graphqlServer, fetch }),
});
