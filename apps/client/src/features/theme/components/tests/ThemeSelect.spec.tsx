import { act, fireEvent, render, screen, within } from '@testing-library/react';

import { ThemeChoice } from '../../helpers/themeTypes';
import { AppTheme } from '../AppTheme';
import { ThemeContext } from '../ThemeContext';
import { ThemeSelect } from '../ThemeSelect';

const testThemeSelectChoice = (themeChoiceToTest: ThemeChoice) => {
  let themeChoice: ThemeChoice | undefined = undefined;

  const renderElement = (
    <AppTheme>
      <ThemeContext.Consumer>
        {(value) => {
          themeChoice = value.themeChoice;
          return null;
        }}
      </ThemeContext.Consumer>
      <ThemeSelect />
    </AppTheme>
  );

  render(renderElement);
  expect(themeChoice).toBe('Same as System');
  const wrapperNode = screen.getByLabelText('Theme');
  const button = within(wrapperNode).getByRole('button');
  expect(button).toBeDefined();

  act(() => {
    fireEvent.mouseDown(button);
  });
  const listbox = screen.getByRole('listbox');
  const lightOption = within(listbox).getByText(themeChoiceToTest);

  act(() => {
    fireEvent.click(lightOption);
  });
  expect(themeChoice).toBe(themeChoiceToTest);
};

describe('ThemeSelect', () => {
  it('should set light mode successfully', () => {
    testThemeSelectChoice('Light');
  });

  it('should set dark mode successfully', () => {
    testThemeSelectChoice('Dark');
  });
});
