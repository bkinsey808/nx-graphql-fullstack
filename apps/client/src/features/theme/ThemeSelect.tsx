import { useReactiveVar } from '@apollo/client';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ChangeEvent, FC, memo } from 'react';

import { ThemeChoice, themeChoiceVar, THEME_CHOICES } from '../../cache';

const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
  if (event?.target?.value) {
    console.log(event.target.value);
    themeChoiceVar(event?.target?.value as ThemeChoice);
  }
};

export const ThemeSelect: FC = memo(() => {
  const themeChoice = useReactiveVar(themeChoiceVar);

  return (
    <form>
      <FormControl variant="outlined">
        <InputLabel id="theme-select-label">Theme</InputLabel>

        <Select
          key={themeChoice}
          value={themeChoice}
          onChange={handleChange}
          label="Theme"
          aria-labelledby="theme-select-label"
        >
          {THEME_CHOICES.map((choice) => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
});
ThemeSelect.displayName = 'ThemeSelect';
