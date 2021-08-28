import { createContext } from 'react';

import { ThemeChoice } from '../helpers/themeTypes';

export const ThemeContext = createContext({
  themeChoice: 'Same as system' as ThemeChoice,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setThemeChoice: (themeChoice: ThemeChoice) => {},
});
