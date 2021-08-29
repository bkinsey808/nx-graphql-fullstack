import { act, renderHook, RenderResult } from '@testing-library/react-hooks';

import { useCustomTheme } from '../useCustomTheme';

type UseCustomThemeType = typeof useCustomTheme;
type UseCustomThemeReturnType = ReturnType<UseCustomThemeType>;
type RenderResultType = RenderResult<UseCustomThemeReturnType>;
type TestThemeChoice = (
  themeChoiceToTest: 'Light' | 'Dark',
  result: RenderResultType
) => void;

/** test a specific themeChoice. (helper function to reduce code duplication) */
const testThemeChoice: TestThemeChoice = (themeChoiceToTest, result) => {
  act(() => {
    result.current.setThemeChoice(themeChoiceToTest);
  });
  expect(result.current.themeChoice).toBe(themeChoiceToTest);
  expect(result.current.themeType).toBe(themeChoiceToTest.toLowerCase());
  expect(result.current.theme).toMatchSnapshot();
};

describe('useCustomTheme', () => {
  test('picks correct theme', () => {
    const { result } = renderHook(() => useCustomTheme());
    expect(result.current.themeChoice).toBe('Same as System');

    testThemeChoice('Light', result);
    testThemeChoice('Dark', result);
  });
});
