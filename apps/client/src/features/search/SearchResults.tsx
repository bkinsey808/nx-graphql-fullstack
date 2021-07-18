import { FC } from 'react';

import { GetSearchResults } from './__generated__/GetSearchResults';

interface SearchResultsProps {
  searchResults: GetSearchResults['search'];
}

export const SearchResults: FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <div>
      {searchResults?.map((searchResult, index) => (
        <div key={index}>
          {searchResult?.__typename === 'Book' ? (
            <div>{searchResult.title}</div>
          ) : (
            <div>{searchResult?.fullName}</div>
          )}
        </div>
      ))}
    </div>
  );
};
