import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";

export const allTags = createAsyncThunk(
  "allTags/tagSlice",
  async (object, { rejectWithValue }) => {
    try {
      const res = apiCalling("get", "/tags");
      return res;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
const tagSlice = createSlice({
  name: "Tags",
  initialState: {
    tags: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allTags.fulfilled, (state, { payload }) => {
      console.log(payload, "in payload");
      state.tags = payload;
    });
  },
});
export const tagReducer = tagSlice.reducer;
