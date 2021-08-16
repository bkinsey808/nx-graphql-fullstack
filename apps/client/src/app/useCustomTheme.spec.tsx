import { act, renderHook } from '@testing-library/react-hooks';

import { themeChoiceVar } from './cache';

import { useCustomTheme } from './useCustomTheme';

test('useCustomTheme picks correct theme', () => {
  themeChoiceVar('Light');
  const lightTheme = renderHook(() => useCustomTheme());
  expect(lightTheme).toMatchSnapshot();
  act(() => {
    themeChoiceVar('Dark');
  });
  const darkTheme = renderHook(() => useCustomTheme());
  expect(darkTheme).toMatchSnapshot();
  expect(lightTheme).not.toEqual(darkTheme);
});
