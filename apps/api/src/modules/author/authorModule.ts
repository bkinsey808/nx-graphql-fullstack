import { createModule, gql } from 'graphql-modules';

import { books } from '../book/books';

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  books: string[];
}

export const authors: Author[] = [
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
  {
    id: '3',
    firstName: 'John',
    lastName: 'Zimmer',
    books: ['2'],
  },
];

export const getFullName = (author: Author) =>
  `${author.lastName}, ${author.firstName}`;

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
      getAuthorById: (_parent: undefined, args: { id: string }) =>
        authors.find((author) => author.id === args.id),
    },
    Author: {
      fullName: getFullName,
      books: (parent: { books: string[] }) =>
        books.filter((book) => parent.books.includes(book.id)),
    },
  },
});
