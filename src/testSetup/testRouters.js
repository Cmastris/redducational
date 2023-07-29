import { createMemoryRouter, RouterProvider } from "react-router-dom";

import App from "../App/App";

export const simpleAppRouter = createMemoryRouter(
  [{ path: "/", element: <App /> }],
  { initialEntries: ["/"] }
);

export function createRouterProvider(component, path = "/", initialEntries = ["/"]) {
  // Create a simple `RouterProvider` for tests that don't involve routing
  // This is required when rendering components that use React Router functions/components
  // E.g. `useSearchParams()` (PostListing) and `Form` (SearchBar)
  const router = createMemoryRouter(
    [{ path: path, element: component }],
    { initialEntries: initialEntries }
  );
  return <RouterProvider router={router} />
}
