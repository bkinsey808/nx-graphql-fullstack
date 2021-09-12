import { createTheme, ThemeOptions } from '@material-ui/core/styles';
import merge from 'ts-deepmerge';

import { darkThemeOptions } from '../helpers/darkThemeOptions';
import { defaultThemeOptions } from '../helpers/defaultThemeOptions';
import { GetTheme } from '../helpers/themeTypes';

/** given theme type, get Material UI theme configuration object */
export const getTheme: GetTheme = (themeType) => {
  const paletteTypeThemeOptions: ThemeOptions = {
    palette: {
      type: themeType,
    },
  };
  return createTheme(
    merge(
      paletteTypeThemeOptions,
      defaultThemeOptions,
      themeType === 'dark' ? darkThemeOptions : {}
    )
  );
};
