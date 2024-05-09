// Card.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';

describe('Button', () => {
  it('renders a card with default styles', () => {
    const { getByText } = render(<Card>Content</Card>);
    expect(getByText('Content')).toBeInTheDocument();
    expect(getByText('Content')).toHaveClass('rounded-lg border bg-card');
  });

  it('applies custom class names', () => {
    const { getByText } = render(
      <Card className="my-custom-card">Content</Card>,
    );
    expect(getByText('Content')).toHaveClass('my-custom-card');
  });

  it('renders a card header', () => {
    const { getByText } = render(<CardHeader>Header</CardHeader>);
    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Header')).toHaveClass('flex flex-col space-y-1.5 p-6');
  });

  it('renders a card title', () => {
    const { getByText } = render(<CardTitle>Title</CardTitle>);
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Title')).toHaveClass('text-2xl font-semibold');
  });

  it('renders a card description', () => {
    const { getByText } = render(
      <CardDescription>Description</CardDescription>,
    );
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Description')).toHaveClass(
      'text-sm text-muted-foreground',
    );
  });

  it('renders a card content', () => {
    const { getByText } = render(<CardContent>Content</CardContent>);
    expect(getByText('Content')).toBeInTheDocument();
    expect(getByText('Content')).toHaveClass('p-6 pt-0');
  });

  it('renders a card footer', () => {
    const { getByText } = render(<CardFooter>Footer</CardFooter>);
    expect(getByText('Footer')).toBeInTheDocument();
    expect(getByText('Footer')).toHaveClass('flex items-center p-6 pt-0');
  });
});
