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
        const lowerCaseContains = contains.toLowerCase();
        console.log({ lowerCaseContains });
        const searchResults = [
          ...books
            .filter((book) =>
              book.title.toLowerCase().includes(lowerCaseContains)
            )
            .map((book) => ({ ...book, resolveType: 'Book' })),
          ...authors
            .filter(
              (author) =>
                author.firstName.toLowerCase().includes(lowerCaseContains) ||
                author.lastName.toLowerCase().includes(lowerCaseContains)
            )
            .map((author) => ({ ...author, resolveType: 'Author' })),
        ];
        return searchResults;
      },
    },
  },
});
