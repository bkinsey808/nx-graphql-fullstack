import { createModule, gql } from 'graphql-modules';

export const helloModule = createModule({
  id: 'helloModule',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        hello: String!
      }
    `,
  ],
  resolvers: {
    Query: {
      hello: () => 'world',
    },
  },
});
