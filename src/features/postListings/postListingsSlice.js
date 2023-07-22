import { createSlice } from "@reduxjs/toolkit";

import { fetchSubTopPosts } from "../../redditAPI";

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

const fetchSubPostData = (sub) => async (dispatch) => {
  try {
    const json = await fetchSubTopPosts(sub, 'day');
    console.log(json);
    // TODO: Dispatch post data to store
    dispatch(changeSubRetrievedStatus({ name: sub, retrieved: true }));
    // TODO: Create array of post IDs
    return [1, 2, 3];
  } catch(e) {
    console.log(e);
    return [];
  }
};

export const fetchListingsData = () => async (dispatch, getState) => {
  // https://redux.js.org/usage/writing-logic-thunks
  // https://redux.js.org/tutorials/essentials/part-5-async-logic
  const state = getState();
  const subreddits = selectSubreddits(state);
  const sub = subreddits['science'].name;
  
  const ids = await dispatch(fetchSubPostData(sub));
  console.log(ids);
};

export default postListings.reducer;
