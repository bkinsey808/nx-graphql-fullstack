import { useReactiveVar } from '@apollo/client';
import { useMediaQuery } from '@material-ui/core';

import { themeChoiceVar } from '../cache';

export const useThemeType = () => {
  const mediaQueryDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeChoice = useReactiveVar(themeChoiceVar);
  return themeChoice === 'Same as System'
    ? mediaQueryDarkMode
      ? 'dark'
      : 'light'
    : (themeChoice.toLowerCase() as 'dark' | 'light');
};
