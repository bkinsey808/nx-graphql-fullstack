/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Books
// ====================================================

export interface Books_books {
  __typename: "Book";
  author: string | null;
  title: string | null;
}

export interface Books {
  books: (Books_books | null)[] | null;
}
