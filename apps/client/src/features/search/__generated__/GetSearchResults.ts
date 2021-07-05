/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchResults
// ====================================================

export interface GetSearchResults_search_Book {
  __typename: "Book";
  title: string | null;
}

export interface GetSearchResults_search_Author {
  __typename: "Author";
  fullName: string | null;
}

export type GetSearchResults_search = GetSearchResults_search_Book | GetSearchResults_search_Author;

export interface GetSearchResults {
  search: (GetSearchResults_search | null)[] | null;
}

export interface GetSearchResultsVariables {
  contains: string;
}
