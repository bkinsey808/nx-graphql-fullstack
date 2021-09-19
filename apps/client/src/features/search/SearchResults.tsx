import { Card, CardHeader, CardContent, List, ListItem } from '@mui/material';
import { FC } from 'react';

import { GetSearchResults } from './__generated__/GetSearchResults';

interface SearchResultsProps {
  searchResults: GetSearchResults['search'];
}

export const SearchResults: FC<SearchResultsProps> = ({
  searchResults,
}: SearchResultsProps) => {
  return (
    <Card>
      <CardHeader title="Search Results" />
      <CardContent>
        {searchResults?.map((searchResult, index) => (
          <List key={index}>
            {searchResult?.__typename === 'Book' ? (
              <ListItem>Book: {searchResult.title}</ListItem>
            ) : (
              <ListItem>Author: {searchResult?.fullName}</ListItem>
            )}
          </List>
        ))}
      </CardContent>
    </Card>
  );
};
