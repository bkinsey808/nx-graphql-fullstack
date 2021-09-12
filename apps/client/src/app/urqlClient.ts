import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import type { IntrospectionQuery } from 'graphql';
import { createClient, dedupExchange, fetchExchange } from 'urql';

import schema from '../../../../schema.json';

console.log('called once');

export const urqlClient = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({ schema: (schema as unknown) as IntrospectionQuery }),
    fetchExchange,
  ],
});
