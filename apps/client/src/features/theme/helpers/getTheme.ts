import { createTheme, ThemeOptions } from '@mui/material/styles';
import merge from 'ts-deepmerge';

import { darkThemeOptions } from '../helpers/darkThemeOptions';
import { defaultThemeOptions } from '../helpers/defaultThemeOptions';
import { GetTheme } from '../helpers/themeTypes';

/** given theme type, get Material UI theme configuration object */
export const getTheme: GetTheme = (themeMode) => {
  const paletteTypeThemeOptions: ThemeOptions = {
    palette: {
      mode: themeMode,
    },
  };
  return createTheme(
    merge(
      paletteTypeThemeOptions,
      defaultThemeOptions,
      themeMode === 'dark' ? darkThemeOptions : {}
    )
  );
};
