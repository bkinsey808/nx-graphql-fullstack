import { Theme } from '@material-ui/core';

import { THEME_CHOICES } from './themeConsts';

export type ThemeChoice = typeof THEME_CHOICES[number]; // string union type

export type ThemeType = 'dark' | 'light';

export type GetTheme = (themeType: ThemeType) => Theme;
