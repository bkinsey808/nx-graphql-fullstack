import { act, fireEvent, render, screen, within } from '@testing-library/react';

import { AppSelect } from '../AppSelect';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'] as const;
type Option = typeof OPTIONS[number]; // string union type

const testOptionChoice = (startOption: Option, chooseOption: Option) => {
  const setOption = jest.fn();

  const renderElement = (
    <AppSelect<Option>
      id="testId"
      label="Test Label"
      value={startOption}
      options={OPTIONS}
      onChange={setOption}
    />
  );

  render(renderElement);
  const wrapperNode = screen.getByLabelText('Test Label');
  const button = within(wrapperNode).getByRole('button');
  expect(button).toBeDefined();

  act(() => {
    fireEvent.mouseDown(button);
  });
  const listbox = screen.getByRole('listbox');
  const menuItem = within(listbox).getByText(chooseOption);

  act(() => {
    fireEvent.click(menuItem);
  });
  if (startOption === chooseOption) {
    expect(setOption).not.toHaveBeenCalled();
  } else {
    expect(setOption).toHaveBeenCalledWith(chooseOption);
  }
};

describe('AppSelect', () => {
  it('should be not be called with Option 1', () => {
    testOptionChoice(OPTIONS[0], OPTIONS[0]);
  });

  it('should be called with Option 2', () => {
    testOptionChoice(OPTIONS[0], OPTIONS[1]);
  });

  it('should be called with Option 3', () => {
    testOptionChoice(OPTIONS[0], OPTIONS[2]);
  });
});
