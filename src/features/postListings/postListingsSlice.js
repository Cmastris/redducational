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
    const postsData = json.data.children.map(post => post.data);
    // console.log(postsData);
    // TODO: Dispatch post data to store

    dispatch(changeSubRetrievedStatus({ name: sub, retrieved: true }));

    return postsData.map(post => post.id);
  } catch(e) {
    throw(e);
  }
};

export const fetchListingsData = () => async (dispatch, getState) => {
  // https://redux.js.org/usage/writing-logic-thunks
  // https://redux.js.org/tutorials/essentials/part-5-async-logic
  const state = getState();
  const subreddits = selectSubreddits(state);
  const subNames = Object.keys(subreddits);

  // Dispatch sub post requests asynchronously; wait for all to resolve or reject
  const settledPromises = await Promise.allSettled(subNames.map(sub => {
    return dispatch(fetchSubPostData(sub));
  }));

  const subPostIds = [];
  settledPromises.forEach(subPromise => {
    if (subPromise.status === "fulfilled") {
      subPostIds.push(subPromise.value);
    }
  });
  console.log(subPostIds);
};

export default postListings.reducer;
