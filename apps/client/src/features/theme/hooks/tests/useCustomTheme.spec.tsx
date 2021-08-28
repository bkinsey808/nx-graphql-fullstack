import { act, renderHook } from '@testing-library/react-hooks';

import { useCustomTheme } from '../useCustomTheme';

test('useCustomTheme picks correct theme', () => {
  const { result } = renderHook(() => useCustomTheme());
  expect(result.current.themeChoice).toBe('Same as System');

  act(() => {
    result.current.setThemeChoice('Light');
  });
  expect(result.current.themeChoice).toBe('Light');
  expect(result.current.themeType).toBe('light');
  expect(result.current.theme).toMatchSnapshot();

  act(() => {
    result.current.setThemeChoice('Dark');
  });
  expect(result.current.themeChoice).toBe('Dark');
  expect(result.current.themeType).toBe('dark');
  expect(result.current.theme).toMatchSnapshot();
});
