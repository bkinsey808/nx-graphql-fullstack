import { createModule, gql } from 'graphql-modules';

export const authors = [
  {
    id: '1',
    name: 'Kate Chopin',
    books: ['1'],
  },
  {
    id: '2',
    author: 'Paul Auster',
    books: ['2'],
  },
];

export const authorsModule = createModule({
  id: 'authorsModule',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Author {
        id: ID!
        name: String
      }

      # The "Query" type is special: it lists all of the available queries that
      # clients can execute, along with the return type for each. In this
      # case, the "books" query returns an array of zero or more Books (defined above).
      extend type Query {
        authors: [Author]
        getAuthorById(id: ID!): Author
      }
    `,
  ],
  resolvers: {
    Query: {
      authors: () => authors,
      getAuthorById: (_parent, args, _context, _info) =>
        authors.find((author) => author.id === args.id),
    },
  },
});
