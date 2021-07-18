import { QueryLazyOptions } from '@apollo/client';
import { FC, memo } from 'react';

import { GetSearchResultsVariables } from './__generated__/GetSearchResults';

interface SearchFormProps {
  search: (
    options?: QueryLazyOptions<GetSearchResultsVariables>
  ) => void;
}

export const SearchForm: FC<SearchFormProps> = memo(({ search }) => {
  return (    
    <input autoFocus
      onChange={({ target: { value } }) =>
        search({ variables: { contains: value } })
      }
      type="text"
    />
  );
});
