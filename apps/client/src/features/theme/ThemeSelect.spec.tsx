import { MockedProvider } from '@apollo/client/testing';

import { fireEvent, render, screen, within } from '@testing-library/react';

import { themeChoiceVar, cache } from '../../cache';

import { ThemeSelect } from './ThemeSelect';

describe('ThemeSelect', () => {
  it('should set light mode successfully', () => {
    render(
      <MockedProvider cache={cache}>
        <ThemeSelect />
      </MockedProvider>
    );
    const wrapperNode = screen.getByLabelText('Theme');
    const button = within(wrapperNode).getByRole('button');
    expect(button).toBeDefined();
    fireEvent.mouseDown(button);
    const listbox = screen.getByRole('listbox');
    const lightOption = within(listbox).getByText('Light');
    fireEvent.click(lightOption);
    expect(themeChoiceVar()).toBe('Light');
  });

  it('should set dark mode successfully', () => {
    render(
      <MockedProvider cache={cache}>
        <ThemeSelect />
      </MockedProvider>
    );
    const wrapperNode = screen.getByLabelText('Theme');
    const button = within(wrapperNode).getByRole('button');
    expect(button).toBeDefined();
    fireEvent.mouseDown(button);
    const listbox = screen.getByRole('listbox');
    const darkOption = within(listbox).getByText('Dark');
    fireEvent.click(darkOption);
    expect(themeChoiceVar()).toBe('Dark');
  });
});

// github copilot next suggestion keyboard shortcut is Alt
