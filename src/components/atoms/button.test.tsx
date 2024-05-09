import { Button } from './button';
import { fireEvent, render } from '@testing-library/react';

describe('Button', () => {
  it('renders a button with default props', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('renders buttons with different variants', () => {
    const { getByText, queryByText } = render(
      <>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Cancel</Button>
      </>,
    );
    expect(getByText('Delete')).toHaveClass('bg-destructive');
    expect(queryByText('Cancel')).toHaveClass('border border-input');
  });

  it('renders buttons with different sizes', () => {
    const { getByText } = render(
      <>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </>,
    );
    expect(getByText('Small')).toHaveClass('h-8 rounded-md px-3');
    expect(getByText('Large')).toHaveClass('h-10 rounded-md px-8');
  });

  it('renders a disabled button', () => {
    const { getByText } = render(<Button disabled>Disabled</Button>);
    expect(getByText('Disabled')).toHaveClass('disabled:opacity-50');
    // Simulate click event
    fireEvent.click(getByText('Disabled'));
    // Check if any actions were triggered (implementation specific)
  });

  it('applies custom class names', () => {
    const { getByText } = render(
      <Button className="my-custom-class">Custom</Button>,
    );
    expect(getByText('Custom')).toHaveClass('my-custom-class');
  });
});
