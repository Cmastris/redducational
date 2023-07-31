import { createBrowserRouter } from "react-router-dom";

import { categories } from "./data/categories";

import App from "./App/App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import PostDetail from "./features/postContent/PostDetail";
import PostListing from "./features/postListings/PostListing";


export const categoryListingRoutes = categories.map(category => {
  return {
    path: "categories/" + category.path,
    element: <PostListing name={category.name} />,
  }
});

// https://reactrouter.com/en/main/routers/create-browser-router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PostListing name="All" />,
      },
      {
        path: "search",
        element: <PostListing name="Search Results" search={true} />,
      },
      {
        path: "r/:subreddit/comments/:id/*",
        element: <PostDetail />,
      },
      ...categoryListingRoutes
    ],
  },
]);
