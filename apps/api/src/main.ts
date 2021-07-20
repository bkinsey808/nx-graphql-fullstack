import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createApplication } from 'graphql-modules';
import * as yargs from 'yargs';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compression from 'compression';

// import { Message } from '@nx-apollo-fullstack/api-interfaces';
import { environment } from './environments/environment';
import { modules } from './modules';

const argv = yargs.options({
  g: { type: 'boolean', alias: 'generate-schema-file', default: false },
}).argv;

const getSchema = () => {
  const application = createApplication({
    modules,
  });
  return application.createSchemaForApollo();
};

const generateSchemaFiles = async () => {
  const fs = await import('fs');
  const { introspectionFromSchema } = await import(
    'graphql/utilities/introspectionFromSchema'
  );
  const { printSchema } = await import('graphql/utilities');
  const schema = getSchema();
  fs.writeFile(
    './libs/api-interfaces/schema/schema.gql',
    printSchema(schema),
    () => {
      console.log('Wrote schema.gql');
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use('*', cors() as any);
  app.use(
    helmet({
      // see https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
      contentSecurityPolicy: environment.production ? undefined : false,
    })
  );
  app.use(compression());

  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: 4000 }, resolve as () => void)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  return { server, app };
};

if (argv.g) generateSchemaFiles();
else startApolloServer();
