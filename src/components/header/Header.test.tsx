import { render, screen } from '@testing-library/react';
import Header from '.';

test('renders Header correctly', () => {
  render(<Header />);

  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByText('Pomodor task manager').classList.contains('component__text')).toBe(true);
});
