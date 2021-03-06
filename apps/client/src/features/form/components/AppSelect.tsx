import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { memo } from 'react';
import { Controller } from 'react-hook-form';
import {
  Control,
  Path,
  PathValue,
  UnpackNestedValue,
} from 'react-hook-form/dist/types';

export const getAppSelectOptions = <LabelType, ValueType>(
  labels: readonly LabelType[],
  values: readonly ValueType[]
) =>
  values.map((value, index) => ({
    label: labels[index],
    value,
  }));

interface AppSelectOption {
  label: string;
  value: string;
}

interface AppSelectProps<
  FormFieldTypes,
  AppSelectOptions extends AppSelectOption[]
> {
  name: Path<FormFieldTypes>;
  label: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control?: Control<FormFieldTypes, object>;
  options: AppSelectOptions;
  defaultValue?: AppSelectOptions[number]['value'] | '';
}

// Fun fact: you can't use React.FC for components with generics
// see https://stackoverflow.com/questions/59947787/generictype-in-react-fcpropst#59947930
// Also, in order to use generics inside the function body, you need to type the function itself,
// not the constant the function is assigned to.
// see https://stackoverflow.com/questions/53320261/typescript-can-i-use-generic-type-in-function-body#53321037
export const UnmemoizedAppSelect = <
  FormFieldTypes,
  AppSelectOptions extends AppSelectOption[]
>({
  name,
  label,
  control,
  options,
  defaultValue = '',
}: AppSelectProps<FormFieldTypes, AppSelectOptions>): JSX.Element => {
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
          <InputLabel id={`field-label-${name}`}>{label}</InputLabel>
          <Select
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            label={label}
            aria-labelledby={`field-label-${name}`}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

// unfortunately, doing the memo as a second step like this seems to be
// necessary in order to perfectly preserve the generics props.
export const AppSelect = memo(
  UnmemoizedAppSelect
) as typeof UnmemoizedAppSelect & { displayName: string };
AppSelect.displayName = 'AppSelect';
