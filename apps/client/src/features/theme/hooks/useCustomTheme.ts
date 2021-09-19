import { useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';

import { getTheme } from '../helpers/getTheme';
import { ThemeChoiceValue, ThemeType } from '../helpers/themeTypes';

export const useCustomTheme = () => {
  const [themeChoiceValue, setThemeChoiceValue] = useState<ThemeChoiceValue>(
    'system'
  );

  const mediaQueryThemeType = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  const themeMode =
    themeChoiceValue === 'system'
      ? mediaQueryThemeType
      : (themeChoiceValue as ThemeType);

  // getTheme is wrapped in useMemo since it is a pure function that contains
  // a potentially expensive deep merge operation.
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  return {
    themeChoiceValue,
    setThemeChoiceValue,
    themeMode,
    theme,
  };
};
