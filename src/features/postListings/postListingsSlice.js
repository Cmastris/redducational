import { createSlice } from "@reduxjs/toolkit";

const initialState = { subreddits: {}, listings: {} }

export const postListings = createSlice({
  name: "postListings",
  initialState,
  reducers: {
    addSubreddit(state, action) {
      const { name } = action.payload;
      state.subreddits[name] = { name: name, postsRetrieved: false };
    },
  },
});

export const { addSubreddit } = postListings.actions;

export const selectSubreddits = (state) => state.postListings.subreddits;

export default postListings.reducer;
