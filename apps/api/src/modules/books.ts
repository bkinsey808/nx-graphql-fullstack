import { createModule, gql } from 'graphql-modules';

const books = [
  {
    id: '1',
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: '2',
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

export const booksModule = createModule({
  id: 'booksModule',
  dirname: __dirname,
  typeDefs: [
    gql`
      # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

      # This "Book" type defines the queryable fields for every book in our data source.
      type Book {
        id: ID!
        title: String
        author: String
      }

      # The "Query" type is special: it lists all of the available queries that
      # clients can execute, along with the return type for each. In this
      # case, the "books" query returns an array of zero or more Books (defined above).
      extend type Query {
        books: [Book]
        getBookById(id: ID!): Book
      }
    `,
  ],
  resolvers: {
    Query: {
      books: () => books,
      getBookById: (_parent, args, _context, _info) =>
        books.find((book) => book.id === args.id),
    },
  },
});
