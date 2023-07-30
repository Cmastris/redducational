import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { screen } from "@testing-library/react";

import App from "../App/App";
import PostListing from "../features/postListings/PostListing";

import { categoryListingRoutes } from "../routing";
import { renderWithProviders } from "../testSetup/setupTests";
import { createRouterProvider } from "../testSetup/testRouters";
import { testState1 } from "../testSetup/testState";

// https://testing-library.com/docs/react-testing-library/intro
// https://jestjs.io/docs/asynchronous

test('App header content is rendered', () => {
  renderWithProviders(createRouterProvider(<App />));
  expect(screen.getByText("ucational")).toBeInTheDocument();
});

test('Category listing routing', () => {
  const router = createMemoryRouter(categoryListingRoutes, {
    initialEntries: ["/categories/science"]
  });

  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByText("Science")).toBeInTheDocument();
});
