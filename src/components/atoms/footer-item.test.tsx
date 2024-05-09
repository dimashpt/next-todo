import React from 'react';
import { render } from '@testing-library/react';
import { FooterItem } from './footer-item';

describe('FooterItem component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<FooterItem>Link Text</FooterItem>);
    const link = getByText('Link Text');
    expect(link).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    const { container } = render(<FooterItem>Link Text</FooterItem>);
    const link = container.firstChild as HTMLElement;
    expect(link).toHaveClass(
      'flex items-center gap-x-1 px-2 py-1 hover:text-foreground text-muted-foreground transition-colors',
    );
  });

  it('passes additional props correctly', () => {
    const onClick = jest.fn();
    const { container } = render(
      <FooterItem href="#" onClick={onClick}>
        Link Text
      </FooterItem>,
    );
    const link = container.firstChild as HTMLElement;
    expect(link).toHaveAttribute('href', '#');
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
