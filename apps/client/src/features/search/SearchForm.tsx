import { QueryLazyOptions } from '@apollo/client';
import { FC, memo } from 'react';
import TextField from '@material-ui/core/TextField';

import { GetSearchResultsVariables } from './__generated__/GetSearchResults';

interface SearchFormProps {
  search: (options?: QueryLazyOptions<GetSearchResultsVariables>) => void;
}

export const SearchForm: FC<SearchFormProps> = memo(({ search }) => {
  return (
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
  );
});
