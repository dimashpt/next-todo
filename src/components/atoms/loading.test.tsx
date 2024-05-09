// Loading.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { Loading } from './loading'; // Replace with the path to your Loading component

describe('Loading component', () => {
  it('renders a loading message', () => {
    const { getByText } = render(<Loading />);
    const message = getByText('Loading...');
    expect(message).toBeInTheDocument();
  });
});
