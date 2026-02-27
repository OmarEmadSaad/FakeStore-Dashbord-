import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState } from "../../types";
import { loginAPI, signupAPI, getCurrentUser, logoutAPI } from "./authAPI";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", loginAPI);
export const signup = createAsyncThunk("auth/signup", signupAPI);
export const loadAuth = createAsyncThunk("auth/load", getCurrentUser);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      logoutAPI();
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message || "Signup failed";
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
