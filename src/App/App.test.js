import { screen } from "@testing-library/react";

import App from "./App";
import PostListing from "../features/postListings/PostListing";

import { renderWithProviders } from "../testSetup/setupTests";

// https://testing-library.com/docs/react-testing-library/intro
// https://jestjs.io/docs/asynchronous

test('App header content is rendered', () => {
  renderWithProviders(<App />);
  expect(screen.getByText("ucational")).toBeInTheDocument();
});

test('Listing name is rendered', () => {
  const name = "Science";
  renderWithProviders(<PostListing name={name} />);
  expect(screen.getByText(name)).toBeInTheDocument();
});

// test('Waits for async code and fails', async () => {
//   renderWithProviders(<App />);
//   expect(await screen.findByText('Not present')).toBeInTheDocument();
// });
