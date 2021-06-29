/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBooks
// ====================================================

export interface GetBooks_books_author {
  __typename: "Author";
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface GetBooks_books {
  __typename: "Book";
  author: GetBooks_books_author | null;
  title: string | null;
}

export interface GetBooks {
  books: (GetBooks_books | null)[] | null;
}
