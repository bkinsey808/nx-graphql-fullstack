import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

interface AppSelectProps<OptionType> {
  id: string;
  label: string;
  value: OptionType;
  options: readonly OptionType[];
  onChange?: (value: OptionType) => void;
}
// Fun fact: you can't use React.FC for components with generics
// see https://stackoverflow.com/questions/59947787/generictype-in-react-fcpropst#59947930
type AppSelectFC = <OptionType extends string>(
  props: AppSelectProps<OptionType>
) => JSX.Element;

export const AppSelect: AppSelectFC = (
  // eslint-disable-next-line react/prop-types
  { id, label, value, options, onChange }
) => (
  <FormControl id={id} variant="outlined">
    <InputLabel id={`${id}-select-label`}>{label}</InputLabel>

    <Select
      value={value}
      // position the menu below the select
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      }}
      onChange={({ target }) => {
        // is there a better way to get OptionType directly?
        onChange?.(target.value as typeof value);
      }}
      label={label}
      aria-labelledby="select-label"
    >
      {
        // eslint-disable-next-line react/prop-types
        options.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))
      }
    </Select>
  </FormControl>
);
