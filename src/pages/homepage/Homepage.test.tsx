import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
// @ts-ignore
import { createMockStore } from 'redux-test-utils';
import Homepage from '.';

const mockStore = createMockStore({
  tasks: {
    tasks: [],
    loading: false,
    isUnsuccessful: false,
    message: '',
  },
});

mockStore.dispatch = jest.fn();

const homepage = (
  <Provider store={mockStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

test('renders Homepage correctly', () => {
  render(homepage);

  expect(screen.getByTestId('homepage')).toBeInTheDocument();
  // I didn't have time to do more testing, sorry
});
