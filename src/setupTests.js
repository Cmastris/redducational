import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import postListingsReducer from "./features/postListings/postListingsSlice";

// https://redux.js.org/usage/writing-tests#integration-testing-connected-components-and-redux-logic
// https://testing-library.com/docs/react-testing-library/setup/#custom-render
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { 
      postListings: postListingsReducer,
    }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of React Testing Library's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}