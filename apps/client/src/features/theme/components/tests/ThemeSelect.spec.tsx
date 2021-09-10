import { act, fireEvent, render, screen, within } from '@testing-library/react';

import {
  THEME_CHOICE_LABELS,
  THEME_CHOICE_VALUES,
} from '../../helpers/themeConsts';
import { ThemeChoiceValue } from '../../helpers/themeTypes';
import { AppTheme } from '../AppTheme';
import { ThemeContext } from '../ThemeContext';
import { ThemeSelect } from '../ThemeSelect';

const testThemeSelectChoice = (themeChoiceValueToTest: ThemeChoiceValue) => {
  let themeChoiceValue: ThemeChoiceValue | undefined = undefined;

  const renderElement = (
    <AppTheme>
      <ThemeContext.Consumer>
        {(value) => {
          themeChoiceValue = value.themeChoiceValue;
          return null;
        }}
      </ThemeContext.Consumer>
      <ThemeSelect />
    </AppTheme>
  );

  render(renderElement);
  expect(themeChoiceValue).toBe('system');
  const wrapperNode = screen.getByLabelText('Theme Choice');
  const button = within(wrapperNode).getByRole('button');
  expect(button).toBeDefined();

  act(() => {
    fireEvent.mouseDown(button);
  });
  const listbox = screen.getByRole('listbox');
  const label =
    THEME_CHOICE_LABELS[THEME_CHOICE_VALUES.indexOf(themeChoiceValueToTest)];
  const lightOption = within(listbox).getByText(label);

  act(() => {
    fireEvent.click(lightOption);
  });
  expect(themeChoiceValue).toBe(themeChoiceValueToTest);
};

describe('ThemeSelect', () => {
  it('should set light mode successfully', () => {
    testThemeSelectChoice('light');
  });

  it('should set dark mode successfully', () => {
    testThemeSelectChoice('dark');
  });
});
