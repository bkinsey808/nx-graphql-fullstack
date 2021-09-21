import { FormControl, TextField } from '@mui/material';
import { memo } from 'react';
import { Controller } from 'react-hook-form';
import {
  Control,
  Path,
  PathValue,
  UnpackNestedValue,
} from 'react-hook-form/dist/types';

interface AppTextFieldProps<FormFieldTypes> {
  name: Path<FormFieldTypes>;
  label: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control?: Control<FormFieldTypes, object>;
  type?: string;
  defaultValue?: string;
}

// Fun fact: you can't use React.FC for components with generics
// see https://stackoverflow.com/questions/59947787/generictype-in-react-fcpropst#59947930
// Also, in order to use generics inside the function body, you need to type the function itself,
// not the constant the function is assigned to.
// see https://stackoverflow.com/questions/53320261/typescript-can-i-use-generic-type-in-function-body#53321037
export const UnmemoizedAppTextField = <FormFieldTypes,>({
  name,
  label,
  control,
  type = 'text',
  defaultValue = '',
}: AppTextFieldProps<FormFieldTypes>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={
        defaultValue as UnpackNestedValue<
          PathValue<FormFieldTypes, Path<FormFieldTypes>>
        >
      }
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl>
          <TextField
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            label={label}
            type={type}
            aria-labelledby={`field-label-${name}`}
          />
        </FormControl>
      )}
    />
  );
};

// unfortunately, doing the memo as a second step like this seems to be
// necessary in order to perfectly preserve the generics props.
export const AppTextField = memo(
  UnmemoizedAppTextField
) as typeof UnmemoizedAppTextField & { displayName: string };
AppTextField.displayName = 'AppTextField';
