import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Axios/axios";

export const Usersgetall = createAsyncThunk(
  "auth/registerUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/admin/getallusers?page=${1}&limit=${10}`);
      return res?.data?.data?.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Usersgetall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Usersgetall.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(Usersgetall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
      });
  },
});

export default userSlice.reducer;