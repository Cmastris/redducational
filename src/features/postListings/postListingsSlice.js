import { createSlice } from "@reduxjs/toolkit";

export const initialState = { subreddits: {}, subsLoaded: false, listings: {} }

export const postListings = createSlice({
  name: "postListings",
  initialState,
  reducers: {
    addSubreddit(state, action) {
      const { name } = action.payload;
      state.subreddits[name] = { name: name, postsRetrieved: false };
    },

    changeSubsLoadedStatus(state, action) {
      const { loaded } = action.payload;
      state.subsLoaded = loaded;
    },

    changeSubRetrievedStatus(state, action) {
      const { name, retrieved } = action.payload;
      state.subreddits[name].postsRetrieved = retrieved;
    },

    addListing(state, action) {
      const { name, path, postIds } = action.payload;
      state.listings[name] = { name, path, postIds };
    },
  },
});

export const { addSubreddit } = postListings.actions;
export const { changeSubsLoadedStatus } = postListings.actions;
export const { changeSubRetrievedStatus } = postListings.actions;
export const { addListing } = postListings.actions;

export const selectSubreddits = (state) => state.postListings.subreddits;
export const selectSubsLoadedStatus = (state) => state.postListings.subsLoaded;

export default postListings.reducer;
