import { QueryLazyOptions } from '@apollo/client';
import { FC, memo } from 'react';
import debounce from 'lodash/debounce';

import { GetSearchResultsVariables } from './__generated__/GetSearchResults';

interface SearchInputProps {
  search: (
    options?: QueryLazyOptions<GetSearchResultsVariables> | undefined
  ) => void;
}

export const SearchInput: FC<SearchInputProps> = memo(({ search }) => {
  const debouncedSearch = debounce(search, 100);
  return (
    <input
      onChange={({ target: { value } }) =>
        debouncedSearch({ variables: { contains: value } })
      }
      type="text"
    />
  );
});
