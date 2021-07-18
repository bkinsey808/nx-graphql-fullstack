import { createModule, gql } from 'graphql-modules';
import { authors } from './authorModule';

export interface Book {
  id: string;
  title: string;
  authorId: string;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Awakening',
    authorId: '1',
  },
  {
    id: '2',
    title: 'City of Glass',
    authorId: '2',
  },
];

export const bookModule = createModule({
  id: 'bookModule',
  dirname: __dirname,
  typeDefs: [
    gql`
      # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

      # This "Book" type defines the queryable fields for every book in our data source.
      type Book {
        id: ID!
        title: String
        author: Author
        type: String
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
      books: () => books.map((book) => ({ ...book, type: 'BookYo' })),
      getBookById: (_parent, args, _context, _info) =>
        books.find((book) => book.id === args.id),
    },
    Book: {
      author: (parent: Book) =>
        authors.find((author) => author.id === parent.authorId),
    },
  },
});
