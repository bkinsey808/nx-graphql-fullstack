import { QueryLazyOptions } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import { FC, memo } from 'react';

import { GetSearchResultsVariables } from './__generated__/GetSearchResults';

interface SearchFormProps {
  search: (options?: QueryLazyOptions<GetSearchResultsVariables>) => void;
}

export const SearchForm: FC<SearchFormProps> = memo(
  ({ search }: SearchFormProps) => {
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
  }
);
SearchForm.displayName = 'SearchForm';
