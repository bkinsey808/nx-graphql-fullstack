import { QueryLazyOptions } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { FC, memo } from 'react';

import { GetSearchResultsVariables } from './__generated__/GetSearchResults';

interface SearchFormProps {
  search: (options?: QueryLazyOptions<GetSearchResultsVariables>) => void;
}

export const SearchForm: FC<SearchFormProps> = memo(({ search }) => {
  return (
    <Card>
      <CardContent>
        <form>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={({ target: { value } }) =>
              search({ variables: { contains: value } })
            }
          />
        </form>
      </CardContent>
    </Card>
  );
});
