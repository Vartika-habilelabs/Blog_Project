import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";
import { toast } from "react-toastify";

export const trendingBlogs = createAsyncThunk(
  "Blogs/trendingBlogs",
  async (object, { rejectWithValue }) => {
    try {
      const result = await apiCalling("get", "/blogs", {}, { trending: true });
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const userBlogs = createAsyncThunk(
  "Blogs/userBlogs",
  async (object, { rejectWithValue }) => {
    try {
      const result = await apiCalling("get", "/blogs", {}, object);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const getAllBlogs = createAsyncThunk(
  "Blogs/allBlogs",
  async (object, { rejectWithValue }) => {
    try {
      console.log(object);
      const res = await apiCalling("get", "/blogs", {}, object);
      console.log(res);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const saveBlogsToDb = createAsyncThunk(
  "Blogs/saveBlogsToDb",
  async (object, { rejectWithValue }) => {
    try {
      const { blogEntry, onSuccess } = object;
      const result = await apiCalling("post", "/blogs/create", blogEntry);
      toast.success("Blog saved successfully");
      if (onSuccess) onSuccess();
      return result;
    } catch (err) {
      const { response } = err;
      const { data } = response || {};
      toast.error(data || "Something went wrong, try again!");
      return rejectWithValue(err);
    }
  }
);
const blogSlice = createSlice({
  name: "Blogs",
  initialState: {
    blogs: {
      trending: [],
      userBlog: [],
      allBlogs: [],
    },
  },
  reducers: {
    toggleLike: (state, { payload: { blogId, isTrending } }) => {
      const key = isTrending ? "trending" : "userBlog";
      state.blogs[key] = state.blogs[key].map((blog) => {
        if (blog._id === blogId) {
          return {
            ...blog,
            isLiked: !blog.isLiked,
            likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
          };
        } else {
          return blog;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(trendingBlogs.fulfilled, (state, { payload }) => {
      state.blogs.trending = payload;
    });
    builder.addCase(userBlogs.fulfilled, (state, { payload }) => {
      state.blogs.userBlog = payload;
    });
    builder.addCase(getAllBlogs.fulfilled, (state, { payload }) => {
      state.blogs.allBlogs = payload;
    });
  },
});
export const { toggleLike } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
