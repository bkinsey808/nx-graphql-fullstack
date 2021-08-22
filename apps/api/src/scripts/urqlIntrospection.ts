import * as fs from 'fs';
import * as path from 'path';

import {
  getIntrospectedSchema,
  minifyIntrospectionQuery,
} from '@urql/introspection';
import { getIntrospectionQuery } from 'graphql';
import fetch from 'node-fetch'; // or your preferred request in Node.js

void fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({ descriptions: false }),
  }),
})
  .then((result) => result.json())
  .then(({ data }) => {
    const minified = minifyIntrospectionQuery(getIntrospectedSchema(data));
    fs.writeFileSync(
      `${process.cwd()}${path.sep}schema.json`,
      JSON.stringify(minified)
    );
  });
