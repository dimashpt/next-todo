// Label.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { Label } from './label';

describe('Label component', () => {
  it('renders with default styles and applies custom class names', () => {
    const { getByText } = render(<Label>My Label</Label>);
    const label = getByText('My Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm font-medium leading-none'); // Default styles
  });

  it('renders with disabled styles when a peer element is disabled', () => {
    const { getByText } = render(
      <div>
        <input type="text" disabled />
        <Label>Disabled Label</Label>
      </div>,
    );
    const label = getByText('Disabled Label');
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(label).toHaveClass('peer-disabled:opacity-70'); // Styles applied when peer is disabled
  });
});
