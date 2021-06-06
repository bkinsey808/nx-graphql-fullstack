import * as express from 'express';
// import { Message } from '@nx-apollo-fullstack/api-interfaces';
import { ApolloServer } from 'apollo-server-express';
import { createApplication } from 'graphql-modules';

import { helloModule } from './modules/helloModule';

const startApolloServer = async () => {
  const application = createApplication({
    modules: [helloModule],
  });
  const schema = application.createSchemaForApollo();
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

startApolloServer();
