import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";

export const saveUsertodb = createAsyncThunk(
  "User/saveUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiCalling("post", "/signup", payload);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: {
    username: null,
    name: null,
    email: null,
    isAdmin: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveUsertodb.fulfilled, (state, action) => {
      console.log("In fulfilled", action);
      state.loading = false;
      const { payload } = action;
      const { email, username, name } = payload;
      state.email = email;
      state.name = name;
      state.username = username;
    });
    builder.addCase(saveUsertodb.pending, (state, action) => {
      console.log("in pending", action);
      state.loading = true;
    });
    builder.addCase(saveUsertodb.rejected, (state, action) => {
      state.loading = false;
      console.log("in rejected", action);
    });
  },
});

export const userReducer = userSlice.reducer;
