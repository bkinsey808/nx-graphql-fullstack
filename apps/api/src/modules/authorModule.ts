import { createModule, gql } from 'graphql-modules';

import { books } from './bookModule';

export const authors = [
  {
    id: '1',
    firstName: 'Kate',
    lastName: 'Chopin',
    books: ['1'],
  },
  {
    id: '2',
    firstName: 'Paul',
    lastName: 'Auster',
    books: ['2'],
  },
];

export const authorModule = createModule({
  id: 'authorModule',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Author {
        id: ID!
        firstName: String
        lastName: String
        fullName: String
        books: [Book]
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
    Author: {
      fullName: (parent) => `${parent.firstName} ${parent.lastName}`,
      books: (parent, _args, _context, _info) =>
        books.filter((book) => parent.books.includes(book.id)),
    },
  },
});