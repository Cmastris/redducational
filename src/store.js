import { configureStore } from "@reduxjs/toolkit";

import postListingsReducer from "./features/postListings/postListingsSlice";

export default configureStore({
  reducer: {
    postListings: postListingsReducer,
  },
});
