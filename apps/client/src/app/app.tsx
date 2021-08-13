import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { Search } from '../features/search/Search';

import { useCustomTheme } from './useCustomTheme';

export const App = () => {
  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Search />
    </ThemeProvider>
  );
};

export default App;
