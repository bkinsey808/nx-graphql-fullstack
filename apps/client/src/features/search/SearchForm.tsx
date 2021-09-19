import { TextField } from '@mui/material';
import { Dispatch, FC, memo, SetStateAction } from 'react';

interface SearchFormProps {
  setContains: Dispatch<SetStateAction<string>>;
}

export const SearchForm: FC<SearchFormProps> = memo(
  ({ setContains }: SearchFormProps) => {
    return (
      <form>
        <TextField
          autoFocus
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={({ target: { value } }) => {
            setContains(value);
          }}
        />
      </form>
    );
  }
);
SearchForm.displayName = 'SearchForm';
