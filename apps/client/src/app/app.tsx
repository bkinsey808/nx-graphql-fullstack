import { useReactiveVar } from '@apollo/client';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import { useMemo } from 'react';
import { themeChoiceVar } from '../cache';
import { Search } from '../features/search/Search';

export const App = () => {
  const mediaQueryDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeChoice = useReactiveVar(themeChoiceVar);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type:
            themeChoice === 'Same as System'
              ? mediaQueryDarkMode
                ? 'dark'
                : 'light'
              : (themeChoice.toLowerCase() as 'dark' | 'light'),
        },
      }),
    [mediaQueryDarkMode, themeChoice]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Search />
    </ThemeProvider>
  );
};

export default App;
