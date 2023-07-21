import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { setupStore } from "./store";

// https://redux.js.org/usage/writing-tests#integration-testing-connected-components-and-redux-logic
// https://testing-library.com/docs/react-testing-library/setup/#custom-render
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of React Testing Library's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}