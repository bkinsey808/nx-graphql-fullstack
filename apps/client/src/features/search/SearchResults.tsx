import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { GetSearchResults } from './__generated__/GetSearchResults';

interface SearchResultsProps {
  searchResults: GetSearchResults['search'];
}

export const SearchResults: FC<SearchResultsProps> = ({ searchResults }) => {
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
