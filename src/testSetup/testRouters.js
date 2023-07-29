import { createMemoryRouter } from "react-router-dom";

import App from "../App/App";

export const simpleAppRouter = createMemoryRouter(
  [{ path: "/", element: <App /> }],
  { initialEntries: ["/"] }
);
