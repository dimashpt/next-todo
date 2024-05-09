// Input.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { Input } from './input';

describe('Input component', () => {
  it('renders a basic input element', () => {
    const { getByTestId } = render(<Input data-testid="my-input" />);
    const input = getByTestId('my-input');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('applies default styles and custom class names', () => {
    const { getByTestId } = render(
      <Input data-testid="my-input" className="my-custom-class" />,
    );
    const input = getByTestId('my-input');
    expect(input).toHaveClass('my-custom-class');
    expect(input).toHaveClass('h-10'); // Default style
    expect(input).toHaveClass('rounded-md'); // Default style
  });

  it('applies disabled styles when disabled prop is true', () => {
    const { getByTestId } = render(<Input data-testid="my-input" disabled />);
    const input = getByTestId('my-input');
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-50');
  });
});
