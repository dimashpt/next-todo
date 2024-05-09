// Checkbox.test.jsx
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Checkbox } from './checkbox';

// Since Checkbox uses client-side logic (data attributes), mark this file as a client component
('use client');

describe('Checkbox component', () => {
  it('renders a checkbox with default styles', () => {
    const { getByLabelText } = render(
      <>
        <label htmlFor="myCheckbox">Checkbox</label>
        <Checkbox id="myCheckbox" />
      </>,
    );
    expect(getByLabelText('Checkbox')).toBeInTheDocument();
    expect(getByLabelText('Checkbox')).toHaveClass(
      'h-4 w-4 shrink-0 rounded-sm border border-primary',
    );
  });

  it('renders a checked checkbox', () => {
    const { getByLabelText } = render(
      <>
        <label htmlFor="myCheckbox">Checkbox</label>
        <Checkbox id="myCheckbox" checked />
      </>,
    );
    expect(getByLabelText('Checkbox')).toBeInTheDocument();
    expect(getByLabelText('Checkbox')).toHaveClass(
      'data-[state=checked]:bg-primary',
    );
  });

  it('does not trigger click event when checkbox is disabled', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <>
        <label htmlFor="myCheckbox">Checkbox</label>
        <Checkbox id="myCheckbox" disabled onClick={handleClick} />
      </>,
    );
    const checkbox = getByLabelText('Checkbox');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
