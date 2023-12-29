import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
  },
  reducers: {},
});
export const blogReducer = blogSlice.reducer;
