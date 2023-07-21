import { screen } from '@testing-library/react';

import { renderWithProviders } from './setupTests';
import App from './App';

test('App renders without crashing', () => {
  renderWithProviders(<App />);
});

test('App dummy content is rendered', () => {
  renderWithProviders(<App />);
  screen.getByText(/Hello World!/i);
});
