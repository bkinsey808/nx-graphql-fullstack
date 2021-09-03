import { createContext } from 'react';

import { ThemeChoiceValue } from '../helpers/themeTypes';

export const ThemeContext = createContext({
  themeChoiceValue: 'system' as ThemeChoiceValue,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setThemeChoiceValue: (themeChoiceValue: ThemeChoiceValue) => {},
});
