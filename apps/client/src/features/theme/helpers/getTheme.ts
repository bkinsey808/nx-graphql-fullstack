import { createTheme } from '@material-ui/core';
import merge from 'lodash/merge';

import { darkTheme } from '../helpers/darkTheme';
import { defaultTheme } from '../helpers/defaultTheme';
import { GetTheme } from '../helpers/themeTypes';

/** given theme type, get Material UI theme configuration object */
export const getTheme: GetTheme = (themeType) =>
  createTheme(
    merge(
      {
        palette: {
          type: themeType,
        },
      },
      defaultTheme,
      themeType === 'dark' ? darkTheme : {}
    )
  );
