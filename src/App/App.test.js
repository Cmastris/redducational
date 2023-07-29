import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { screen } from "@testing-library/react";

import App from "./App";
import PostListing from "../features/postListings/PostListing";

import { categoryListingRoutes } from "../routing";
import { renderWithProviders } from "../testSetup/setupTests";
import { testState1 } from "../testSetup/testState";

// https://testing-library.com/docs/react-testing-library/intro
// https://jestjs.io/docs/asynchronous
// https://reactrouter.com/en/main/routers/create-memory-router

test('App header content is rendered', () => {
  renderWithProviders(<App />);
  expect(screen.getByText("ucational")).toBeInTheDocument();
});

test('Listing name is rendered', () => {
  const name = "Science";
  renderWithProviders(<PostListing name={name} />);
  expect(screen.getByText(name)).toBeInTheDocument();
});

test('Category listing routing', () => {
  const router = createMemoryRouter(categoryListingRoutes, {
    initialEntries: ["/categories/science"]
  });

  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByText("Science")).toBeInTheDocument();
});

test('Posts are not filtered when rendered in the `All` listing feed', () => {
  renderWithProviders(<PostListing name="All" />, { preloadedState: testState1 });
  // TODO: change to post title after implementing post item component
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(screen.getByText("6")).toBeInTheDocument();
});
