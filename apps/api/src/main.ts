import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as yargs from 'yargs';

// import { Message } from '@nx-apollo-fullstack/api-interfaces';
import { getSchema } from './schema';

const argv = yargs.options({
  g: { type: 'boolean', alias: 'generate-schema-file', default: false },
}).argv;

const generateSchemaFiles = async () => {
  const schema = getSchema();
  const fs = await import('fs');
  const { introspectionFromSchema } = await import(
    'graphql/utilities/introspectionFromSchema'
  );
  const { printSchema } = await import('graphql/utilities/printSchema');
  fs.writeFile(
    './libs/api-interfaces/schema/schema.graphql',
    printSchema(schema),
    () => {
      console.log('Wrote schema.graphql');
    }
  );
  const introspection = await introspectionFromSchema(schema);
  const json = JSON.stringify(introspection, null, 2);
  fs.writeFile('./libs/api-interfaces/schema/schema.json', json, () => {
    console.log('Wrote schema.json');
  });
};

const startApolloServer = async () => {
  const schema = getSchema();
  const server = new ApolloServer({ schema });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: 4000 }, resolve as () => void)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  return { server, app };
};

if (argv.g) {
  generateSchemaFiles();
} else {
  startApolloServer();
}
