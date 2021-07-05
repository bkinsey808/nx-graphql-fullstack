import { QueryLazyOptions } from '@apollo/client';
import { FC, memo } from 'react';

import { GetSearchResultsVariables } from './__generated__/GetSearchResults';

interface SearchInputProps {
  search: (
    options?: QueryLazyOptions<GetSearchResultsVariables> | undefined
  ) => void;
}

export const SearchInput: FC<SearchInputProps> = memo(({ search }) => {
  return (
    <input
      onChange={({ target: { value } }) =>
        search({ variables: { contains: value } })
      }
      type="text"
    />
  );
});
