import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { FC } from 'react';

import { useCustomTheme } from '../hooks/useCustomTheme';

import { ThemeContext } from './ThemeContext';

export const AppTheme: FC = ({ children }) => {
  const { themeChoice, setThemeChoice, theme } = useCustomTheme();

  return (
    <ThemeContext.Provider value={{ themeChoice, setThemeChoice }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
