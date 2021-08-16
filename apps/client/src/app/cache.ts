import { InMemoryCache, makeVar } from '@apollo/client';

export const THEME_CHOICES = ['Same as System', 'Light', 'Dark'] as const;
export type ThemeChoice = typeof THEME_CHOICES[number]; // union type
export const themeChoiceVar = makeVar<ThemeChoice>('Same as System');

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        themeChoice: {
          read() {
            return themeChoiceVar();
          },
        },
      },
    },
  },
});
