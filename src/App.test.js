import { screen } from "@testing-library/react";

import App from "./App";
import { renderWithProviders } from "./testSetup/setupTests";

// https://testing-library.com/docs/react-testing-library/intro
// https://jestjs.io/docs/asynchronous

test('App header content is rendered', () => {
  renderWithProviders(<App />);
  expect(screen.getByText("redducational")).toBeInTheDocument();
});

// test('Waits for async code and fails', async () => {
//   renderWithProviders(<App />);
//   expect(await screen.findByText('Not present')).toBeInTheDocument();
// });
