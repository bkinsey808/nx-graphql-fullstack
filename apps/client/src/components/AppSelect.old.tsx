import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

interface BaseOptionType {
  value: string;
  label: string;
}

interface AppSelectProps<OptionType extends BaseOptionType> {
  id: string;
  label: string;
  value: OptionType['value'];
  options: OptionType[];
  name?: string;
  onSet?: (value: OptionType['value']) => void;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onBlur?: () => void;
  inputRef?: React.Ref<HTMLDivElement>;
}

// Fun fact: you can't use React.FC for components with generics
// see https://stackoverflow.com/questions/59947787/generictype-in-react-fcpropst#59947930
// Also, in order to use generics inside the function body, you need to type the function itself,
// not the constant the function is assigned to.
// see https://stackoverflow.com/questions/53320261/typescript-can-i-use-generic-type-in-function-body#53321037
export const AppSelect = <OptionType extends BaseOptionType>({
  id,
  label,
  value,
  options,
  onSet,
  onChange,
  onBlur,
  name,
  inputRef,
}: AppSelectProps<OptionType>): JSX.Element => {
  return (
    <FormControl id={id} variant="outlined">
      <InputLabel id={`${id}-select-label`}>{label}</InputLabel>

      <Select
        inputRef={inputRef}
        onBlur={onBlur}
        value={value}
        name={name}
        // position the menu below the select
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          onSet?.(event.target.value as OptionType['value']);
          onChange?.(event);
        }}
        label={label}
        aria-labelledby={`${id}-select-label`}
      >
        {options.map((option) => (
          <MenuItem key={option['value']} value={option['value']}>
            {option['label']}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
