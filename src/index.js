import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { categories } from "./data/categories";
import store from "./store";

import App from "./App/App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import PostListing from "./features/postListings/PostListing";
import "./index.css";

const categoryListings = categories.map(category => {
  return {
    path: "categories/" + category.path,
    element: <PostListing name={category.name} />,
  }
});

// https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PostListing name="All" />,
      },
      ...categoryListings
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
