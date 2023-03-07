import { render, screen } from '@testing-library/react';
import Task from '.';

const handleClick = jest.fn();

test('renders Task correctly', () => {
  render(<Task title="qui est esse" description="Lorem ipsum" onClickStart={handleClick} />);

  expect(screen.getByTestId('task')).toBeInTheDocument();
  expect(screen.getByText('qui est esse').classList.contains('component__title')).toBe(true);
  expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
});
