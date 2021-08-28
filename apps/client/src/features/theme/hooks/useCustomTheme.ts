import { useMediaQuery } from '@material-ui/core';
import { useMemo, useState } from 'react';

import { getTheme } from '../helpers/getTheme';
import { ThemeChoice, ThemeType } from '../helpers/themeTypes';

export const useCustomTheme = () => {
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>('Same as System');

  const mediaQueryThemeType = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  const themeType =
    themeChoice === 'Same as System'
      ? mediaQueryThemeType
      : (themeChoice.toLowerCase() as ThemeType);

  // getTheme is wrapped in useMemo since it is a pure function that contains
  // a potentially expensive deep merge operation.
  const theme = useMemo(() => getTheme(themeType), [themeType]);

  return {
    themeChoice,
    setThemeChoice,
    themeType,
    theme,
  };
};
