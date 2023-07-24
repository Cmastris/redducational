import { createSlice } from "@reduxjs/toolkit";

export const initialState = { posts: {} };

export const postContent = createSlice({
  name: "postContent",
  initialState,
  reducers: {},
});

export default postContent.reducer;
