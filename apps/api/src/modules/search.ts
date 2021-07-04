import { createModule, gql } from 'graphql-modules';
import { authors } from './authorModule';
import { books } from './bookModule';

export const searchModule = createModule({
  id: 'searchModule',
  dirname: __dirname,
  typeDefs: [
    gql`
      union SearchResult = Book | Author

      extend type Query {
        search(contains: String): [SearchResult]
      }
    `,
  ],
  resolvers: {
    SearchResult: {
      __resolveType: ({ resolveType }) => resolveType,
    },
    Query: {
      search: (_parent, { contains }) => {
        const searchResults = [
          ...books
            .filter((book) => book.title.includes(contains))
            .map((book) => ({ ...book, resolveType: 'Book' })),
          ...authors
            .filter(
              (author) =>
                author.firstName.includes(contains) ||
                author.lastName.includes(contains)
            )
            .map((author) => ({ ...author, resolveType: 'Author' })),
        ];
        console.log({ searchResults });
        return searchResults;
      },
    },
  },
});
