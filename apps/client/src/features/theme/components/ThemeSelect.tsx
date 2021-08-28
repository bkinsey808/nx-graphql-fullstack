import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { FC, memo, useContext } from 'react';

import { THEME_CHOICES } from '../helpers/themeConsts';
import { ThemeChoice } from '../helpers/themeTypes';

import { ThemeContext } from './ThemeContext';

export const ThemeSelect: FC = memo(() => {
  const { themeChoice, setThemeChoice } = useContext(ThemeContext);

  return (
    <form>
      <FormControl variant="outlined">
        <InputLabel id="theme-select-label">Theme</InputLabel>

        <Select
          key={themeChoice}
          value={themeChoice}
          onChange={(event) => {
            if (event?.target?.value) {
              const newThemeChoice = event.target.value as ThemeChoice;
              setThemeChoice(newThemeChoice);
            }
          }}
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
