import { createSlice } from "@reduxjs/toolkit";

export const initialState = { posts: {} };

export const postContent = createSlice({
  name: "postContent",
  initialState,
  reducers: {
    addPost(state, action) {
      const { id } = action.payload;
      state.posts[id] = action.payload;
    },
  },
});

export const { addPost } = postContent.actions;

export const selectPost = (state, id) => state.postContent.posts[id];

export default postContent.reducer;
