import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as yargs from 'yargs';

// import { Message } from '@nx-apollo-fullstack/api-interfaces';
import { getSchema } from './schema';

const argv = yargs.options({
  g: { type: 'boolean', alias: 'generate-schema-file', default: false },
}).argv;

const generateSchemaFile = async () => {
  const schema = getSchema();
  const fs = await import('fs');
  const { printSchema } = await import('graphql');
  fs.writeFile('schema.graphql', printSchema(schema), () => {
    console.log('Wrote schema.graphql');
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
  generateSchemaFile();
} else {
  startApolloServer();
}
