import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";

export const saveUsertodb = createAsyncThunk(
  "User/saveUser",
  async (payload, { rejectWithValue }) => {
    console.log(payload,"payload")
    try {
      const res = await apiCalling("post", "/signup", payload);
      console.log(res);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: {
    name: null,
    email: null,
    isAdmin: false,
    loading: false,
  },
  reducers: {
    // saveUser: (state, action) => {
    //   console.log(action);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(saveUsertodb.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(saveUsertodb.pending, (state, actions) => {
      state.loading = true;
    });
    builder.addCase(saveUsertodb.rejected, (state, action) => {});
  },
});

export const userReducer = userSlice.reducer;
