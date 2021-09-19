import { act, renderHook, RenderResult } from '@testing-library/react-hooks';

import { useCustomTheme } from '../useCustomTheme';

type UseCustomThemeType = typeof useCustomTheme;
type UseCustomThemeReturnType = ReturnType<UseCustomThemeType>;
type RenderResultType = RenderResult<UseCustomThemeReturnType>;
type TestThemeChoice = (
  themeChoiceToTest: 'light' | 'dark',
  result: RenderResultType
) => void;

/** test a specific themeChoice. (helper function to reduce code duplication) */
const testThemeChoice: TestThemeChoice = (themeChoiceToTest, result) => {
  act(() => {
    result.current.setThemeChoiceValue(themeChoiceToTest);
  });
  expect(result.current.themeChoiceValue).toBe(themeChoiceToTest);
  expect(result.current.themeMode).toBe(themeChoiceToTest);
  expect(result.current.theme).toMatchSnapshot();
};

describe('useCustomTheme', () => {
  test('picks correct theme', () => {
    const { result } = renderHook(() => useCustomTheme());
    expect(result.current.themeChoiceValue).toBe('system');

    testThemeChoice('light', result);
    testThemeChoice('dark', result);
  });
});
