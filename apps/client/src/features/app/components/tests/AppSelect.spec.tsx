import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { AppSelect, getAppSelectOptions } from '../AppSelect';

const TEST_OPTION_LABELS = ['Option 1', 'Option 2', 'Option 3'] as const;
const TEST_OPTION_VALUES = ['option_1', 'option_2', 'option_3'] as const;
type TestOptionLabel = typeof TEST_OPTION_LABELS[number];
type TestOptionValue = typeof TEST_OPTION_VALUES[number];

export const TEST_OPTIONS = getAppSelectOptions<
  TestOptionLabel,
  TestOptionValue
>(TEST_OPTION_LABELS, TEST_OPTION_VALUES);

interface TestFieldTypes {
  testOption: typeof TEST_OPTIONS[number]['value'];
}

const RenderElement: FC<{
  startOptionIndex: number;
  setOption: (value: typeof TEST_OPTION_VALUES[number]) => void;
}> = (
  // eslint-disable-next-line react/prop-types
  { startOptionIndex, setOption }
) => {
  const { control, watch } = useForm<TestFieldTypes>();

  useEffect(() => {
    setOption(watch('testOption'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('testOption')]);

  return (
    <AppSelect<TestFieldTypes, typeof TEST_OPTIONS>
      name="testOption"
      label="Test Label"
      defaultValue={TEST_OPTION_VALUES[startOptionIndex]}
      options={TEST_OPTIONS}
      control={control}
    />
  );
};

const testOptionChoice = (
  startOptionIndex: number,
  chooseOptionIndex: number
) => {
  const setOption = jest.fn();

  render(
    <RenderElement startOptionIndex={startOptionIndex} setOption={setOption} />
  );
  const wrapperNode = screen.getByLabelText('Test Label');
  const button = within(wrapperNode).getByRole('button');
  expect(button).toBeDefined();

  act(() => {
    fireEvent.mouseDown(button);
  });
  const listbox = screen.getByRole('listbox');
  const menuItem = within(listbox).getByText(
    TEST_OPTION_LABELS[chooseOptionIndex]
  );

  act(() => {
    fireEvent.click(menuItem);
  });
  expect(setOption).toHaveBeenCalledWith(TEST_OPTION_VALUES[chooseOptionIndex]);
};

describe('AppSelect', () => {
  it('should be not be called with Option 1', () => {
    testOptionChoice(0, 0);
  });

  it('should be called with Option 2', () => {
    testOptionChoice(0, 1);
  });

  it('should be called with Option 3', () => {
    testOptionChoice(0, 2);
  });
});
