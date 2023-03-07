import { render, screen } from '@testing-library/react';
import Tag from '.';

test('renders Footer correctly', () => {
  render(<Tag text="Tag" />);

  expect(screen.getByTestId('tag')).toBeInTheDocument();
  expect(screen.getByText('Tag')).toBeInTheDocument();
});
