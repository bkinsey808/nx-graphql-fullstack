import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { useMemo } from 'react';

import { Search } from '../features/search/Search';

import { useThemeType } from './useThemeType';

export const App = () => {
  const themeType = useThemeType();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: themeType,
        },
      }),
    [themeType]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Search />
    </ThemeProvider>
  );
};

export default App;
