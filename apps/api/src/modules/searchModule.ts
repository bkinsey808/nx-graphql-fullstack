import { createModule, gql } from 'graphql-modules';

import { Author, authors, getFullName } from './author/authorModule';
import { Book, books } from './book/books';

type BookOrAuthor =
  | (Book & { resolveType: 'Book' })
  | (Author & { resolveType: 'Author' });

const bookAndAuthorSorter = (a: BookOrAuthor, b: BookOrAuthor) => {
  const aSearchField =
    a.resolveType === 'Book' ? (a as Book).title : getFullName(a as Author);
  const bSearchField =
    b.resolveType === 'Book' ? (b as Book).title : getFullName(b as Author);
  return aSearchField.localeCompare(bSearchField);
};

const getFilteredBooksAndAuthors = (contains: string) => {
  const lowerCaseContains = contains.toLowerCase();
  return [
    ...books
      .filter((book) => book.title.toLowerCase().includes(lowerCaseContains))
      .map((book) => ({ ...book, resolveType: 'Book' })),
    ...authors
      .filter(
        (author) =>
          author.firstName.toLowerCase().includes(lowerCaseContains) ||
          author.lastName.toLowerCase().includes(lowerCaseContains)
      )
      .map((author) => ({ ...author, resolveType: 'Author' })),
  ] as BookOrAuthor[];
};

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
      __resolveType: ({ resolveType }: { resolveType: string }) => resolveType,
    },
    Query: {
      search: (_parent: undefined, { contains }: { contains: string }) =>
        getFilteredBooksAndAuthors(contains).sort(bookAndAuthorSorter),
    },
  },
});
