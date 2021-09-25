import { createTheme } from '@mui/material/styles';
// see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
// eslint-disable-next-line no-duplicate-imports
import type { ThemeOptions } from '@mui/material/styles';
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
