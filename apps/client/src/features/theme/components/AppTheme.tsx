import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { FC } from 'react';

import { useCustomTheme } from '../hooks/useCustomTheme';

import { ThemeContext } from './ThemeContext';

export const AppTheme: FC = ({ children }) => {
  const { themeChoiceValue, setThemeChoiceValue, theme } = useCustomTheme();

  return (
    <ThemeContext.Provider value={{ themeChoiceValue, setThemeChoiceValue }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
