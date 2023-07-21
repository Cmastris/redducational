import { createSlice } from "@reduxjs/toolkit";

export const initialState = { subreddits: {}, listings: {} }

export const postListings = createSlice({
  name: "postListings",
  initialState,
  reducers: {
    addSubreddit(state, action) {
      const { name } = action.payload;
      state.subreddits[name] = { name: name, postsRetrieved: false };
    },

    addListing(state, action) {
      const { name, path, postIds } = action.payload;
      state.listings[name] = { name, path, postIds };
    },
  },
});

export const { addSubreddit } = postListings.actions;
export const { addListing } = postListings.actions;

export const selectSubreddits = (state) => state.postListings.subreddits;

export default postListings.reducer;
