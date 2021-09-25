import type { Theme } from '@mui/material/styles';

import {
  THEME_CHOICES,
  THEME_CHOICE_LABELS,
  THEME_CHOICE_VALUES,
} from './themeConsts';

export type ThemeChoiceLabel = typeof THEME_CHOICE_LABELS[number]; // string union type
export type ThemeChoiceValue = typeof THEME_CHOICE_VALUES[number]; // string union type
export type ThemeChoice = typeof THEME_CHOICES[number];

export type ThemeType = 'dark' | 'light';

export type GetTheme = (themeType: ThemeType) => Theme;
