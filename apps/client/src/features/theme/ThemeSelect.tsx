import { useReactiveVar } from '@apollo/client';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { ChangeEvent, FC, memo } from 'react';

import { ThemeChoice, themeChoiceVar, THEME_CHOICES } from '../../cache';

const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
  if (event?.target?.value) {
    console.log('setting', event?.target?.value);
    themeChoiceVar(event?.target?.value as ThemeChoice);
  }
};

export const ThemeSelect: FC = memo(() => {
  const themeChoice = useReactiveVar(themeChoiceVar);
  console.log('render', themeChoice);
  return (
    <Card>
      <CardContent>
        <form>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Theme
            </InputLabel>
            <Select
              key={themeChoice}
              value={themeChoice}
              onChange={handleChange}
              label="Theme"
            >
              {THEME_CHOICES.map((choice) => (
                <MenuItem key={choice} value={choice}>
                  Choice: {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
});
