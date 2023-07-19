import { createSlice } from "@reduxjs/toolkit";

export const postListings = createSlice({
  name: "postListings",
  initialState: {
    subreddits: {},
    listings: {},
  },
  reducers: {},
});
