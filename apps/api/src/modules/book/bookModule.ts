import { ApolloError } from 'apollo-server-express';
import { createModule, gql } from 'graphql-modules';
import * as uuid from 'uuid';

import { authors } from '../author/authorModule';

import { Book, books } from './books';

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

      type Mutation {
        addBook(title: String!, authorId: String!): Book
      }
    `,
  ],
  resolvers: {
    Query: {
      books: () => books.map((book) => ({ ...book, type: 'Book' })),
      getBookById: (_parent: undefined, args: { id: string }) =>
        books.find((book) => book.id === args.id),
    },
    Mutation: {
      addBook: (_parent: undefined, { title, authorId }: Omit<Book, 'id'>) => {
        if (!title) {
          throw new ApolloError('Title is required');
        }
        if (!authorId) {
          throw new ApolloError('AuthorId is required');
        }
        if (!authors.find((author) => author.id === authorId)) {
          throw new ApolloError('AuthorId not found');
        }
        const newBook: Book = {
          id: uuid.v4(),
          title,
          authorId,
        };
        books.push(newBook);
        return newBook;
      },
    },
    Book: {
      author: (parent: Book) =>
        authors.find((author) => author.id === parent.authorId),
    },
  },
});
