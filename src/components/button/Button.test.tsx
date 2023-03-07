import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

const handleClick = jest.fn();

test('renders Button correctly', () => {
  render(<Button onClick={handleClick} text="Light Button" />);
  expect(screen.getByTestId('button')).toBeInTheDocument();
  expect(screen.getByText(/Light Button/i).classList.contains('light')).toBe(true);

  render(<Button onClick={handleClick} text="Danger button" color="danger" />);
  expect(screen.getByText(/Danger button/i).classList.contains('danger')).toBe(true);

  render(<Button onClick={handleClick} text="Warning button" color="warning" />);
  expect(screen.getByText(/Warning button/i).classList.contains('warning')).toBe(true);

  render(<Button onClick={handleClick} text="Info button" color="info" />);
  expect(screen.getByText(/Info button/i).classList.contains('info')).toBe(true);
});

test('renders Button disabled', () => {
  render(<Button onClick={handleClick} text="Button" disabled />);
  expect(screen.getByText(/Button/i)).toBeDisabled();
  fireEvent.click(screen.getByText(/Button/i));
  expect(handleClick).toHaveBeenCalledTimes(0);
});

test('renders Button onClick prop when clicked', () => {
  render(<Button onClick={handleClick} text="Button" />);
  fireEvent.click(screen.getByText(/Button/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
