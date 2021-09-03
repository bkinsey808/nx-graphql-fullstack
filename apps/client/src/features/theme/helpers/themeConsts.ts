export const THEME_CHOICE_LABELS = ['Same as System', 'Light', 'Dark'] as const;
export const THEME_CHOICE_VALUES = ['system', 'light', 'dark'] as const;

export const THEME_CHOICES = THEME_CHOICE_VALUES.map((value, index) => ({
  label: THEME_CHOICE_LABELS[index],
  value,
}));
