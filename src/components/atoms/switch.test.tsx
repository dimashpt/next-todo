// Switch.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { Switch } from './switch'; // Replace with the path to your Switch component

describe('Switch component', () => {
  it('renders a switch element', () => {
    const { getByRole } = render(<Switch />);
    expect(getByRole('switch')).toBeInTheDocument();
  });

  it('applies default styles and custom class names', () => {
    const { getByRole } = render(<Switch className="my-custom-switch" />);
    const switchElement = getByRole('switch');
    expect(switchElement).toHaveClass('my-custom-switch');
    expect(switchElement).toHaveClass('h-6'); // Default style
  });

  it('renders with different states (checked/unchecked)', () => {
    const { getByTestId: checked } = render(
      <Switch checked data-testid="checked" />,
    );
    const checkedSwitch = checked('checked');
    expect(checkedSwitch).toHaveAttribute('data-state', 'checked');

    const { getByTestId: unchecked } = render(
      <Switch data-testid="unchecked" />,
    );
    const uncheckedSwitch = unchecked('unchecked');
    expect(uncheckedSwitch).toHaveAttribute('data-state', 'unchecked');
  });
});
