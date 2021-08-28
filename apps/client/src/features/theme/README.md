# Theme feature

This feature attempts to demonstrate best practices for building a light theme/dark theme switcher for Material UI without a state management library such as Redux. Instead, this app is using React Context for local state, which has the advantage of requiring less download size, but has the disadvantage, in my opinion, of being a bit more awkward to work with than a full fledged state management library. It's all about tradeoffs.

What we are implementing here is a Theme Select component, and the plumbing necessary to make it work with Material UI.

## Material UI theming strategy

Material UI has a `ThemeProvider` component that takes a theme configuration object as a prop. Inside that theme configuration object is a `palette` property, and inside the `palette` property is a `type` property and that `type` property can be `'light' | 'dark'`, and that `type` property tells Material UI to choose the theme colors appropriately.

One other requirement is that we want to make tweaks to the theme. For example, we want to change the dark mode primary blue to something that has a bit more contrast to the default dark mode primary blue.

We could build a single Material UI theme configuration object to rule them all, and then have switching logic inside of it to set dark mode tweaks on a case by case basis. But this example will use the strategy of having a default theme (assumed to be light mode) and then layering on top of it a dark mode theme, if appropriate, to override the default theme using a deep merge. This way both our defaultTheme and darkTheme can be implemented as simple static objects.

So the core logic (lowest level, closest to Material UI) will look like this:

```ts
const getTheme: GetTheme = (themeType) =>
  createTheme(
    merge(
      {
        palette: {
          type: themeType,
        },
      },
      defaultTheme,
      themeType === 'dark' ? darkTheme : {}
    )
  );
```

where `createTheme` is imported from Material UI, `merge` is imported from Lodash, and themeType is our choice of `'light' | 'dark'`. Note that with `merge`, the order of operations is important, the latter objects override the earlier ones.

In our case, darkTheme is super simple, just:

```ts
export const darkTheme: ThemeOptions = {
  palette: {
    primary: {
      main: lightBlue[500],
    },
  },
};
```

where `lightBlue[500]` is just a lighter shade of blue than the default primary blue, and looks a bit nicer to me. We don't need to specify palette type, because that is handled in the merge block of code above.

But all of this code still begs the question: how do we get the `themeType` set in the first place, and update it in response to the user's selection?

For this we have a custom hook.

## Custom Hook: `useCustomTheme`

Encapsulated in this custom hook is the state that contains the user's theme choice, plus the setter to change it. If this app were using Redux, we would have put the state in the Redux store instead.

`useMediaQuery` is used in this case to detect system preference for dark mode. It seems like a versatile hook, bringing the magic of media queries out of CSS and into your React code. I like it.

`getTheme` is wrapped in `useMemo`. Since it is a pure function that contains a potentially expensive deep merge operation, it seems prudent to limit unnecessary recalculations.

```ts
export const useCustomTheme = () => {
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>('Same as System');

  const mediaQueryThemeType = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  const themeType =
    themeChoice === 'Same as System'
      ? mediaQueryThemeType
      : (themeChoice.toLowerCase() as ThemeType);

  const theme = useMemo(() => getTheme(themeType), [themeType]);

  return {
    themeChoice,
    setThemeChoice,
    themeType,
    theme,
  };
};
```

So far, so good. But how do we use this custom hook?
