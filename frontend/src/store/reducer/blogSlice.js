import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";
export const trendingBlogs = createAsyncThunk(
  "Blogs/trendingBlogs",
  async (object, { rejectWithValue }) => {
    try {
      const result = apiCalling("get", "/blogs",{},{trending:true});
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
const blogSlice = createSlice({
  name: "Blogs",
  initialState: {
    blogs: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(trendingBlogs.fulfilled, (state, action) => {
      const { payload } = action;
      state.blogs.trending = payload;
    });
    builder.addCase(trendingBlogs.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(trendingBlogs.pending, (state, action) => {
      console.log(action);
    });
  },
});
export const blogReducer = blogSlice.reducer;
