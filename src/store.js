import { configureStore } from "@reduxjs/toolkit";

import postListingsReducer from "./features/postListings/postListingsSlice";

const reducers = {
  postListings: postListingsReducer,
};

export default configureStore({
  reducer: reducers
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: reducers,
    preloadedState
  })
};