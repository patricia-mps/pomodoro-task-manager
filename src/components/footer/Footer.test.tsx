import { render, screen } from '@testing-library/react';
import Footer from '.';

test('renders Footer correctly', () => {
  render(<Footer />);

  expect(screen.getByTestId('footer')).toBeInTheDocument();
  expect(screen.getByText('Developed by Patrícia Silva')).toBeInTheDocument();
  expect(screen.getByAltText(/github icon/i)).toBeInTheDocument();
  expect(screen.getByAltText(/linkedin icon/i)).toBeInTheDocument();
});
