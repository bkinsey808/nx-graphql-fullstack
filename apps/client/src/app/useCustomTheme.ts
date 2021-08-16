import { useReactiveVar } from '@apollo/client';
import { createTheme, useMediaQuery } from '@material-ui/core';
import { merge } from 'lodash';
import { useMemo } from 'react';

import { themeChoiceVar } from './cache';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const useCustomTheme = () => {
  const mediaQueryDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeChoice = useReactiveVar(themeChoiceVar);
  const themeType =
    themeChoice === 'Same as System'
      ? mediaQueryDarkMode
        ? 'dark'
        : 'light'
      : (themeChoice.toLowerCase() as 'dark' | 'light');

  return useMemo(
    () =>
      createTheme(
        merge(
          {
            palette: {
              type: themeType,
            },
          },
          themeType === 'light' ? lightTheme : darkTheme
        )
      ),
    [themeType]
  );
};
