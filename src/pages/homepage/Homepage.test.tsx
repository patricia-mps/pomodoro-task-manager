import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from '.';

const homepage = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  </BrowserRouter>
);

test('renders Homepage correctly', () => {
  render(homepage);

  expect(screen.getByTestId('homepage')).toBeInTheDocument();
});
