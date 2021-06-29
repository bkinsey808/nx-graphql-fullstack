/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBookById
// ====================================================

export interface GetBookById_getBookById_author {
  __typename: "Author";
  fullName: string | null;
}

export interface GetBookById_getBookById {
  __typename: "Book";
  title: string | null;
  author: GetBookById_getBookById_author | null;
  id: string;
}

export interface GetBookById {
  getBookById: GetBookById_getBookById | null;
}

export interface GetBookByIdVariables {
  id: string;
}
