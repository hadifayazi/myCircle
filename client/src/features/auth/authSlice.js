import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export const userSelector = (state) => state.auth.user;
export const accessTokenSelector = (state) => state.auth.accessToken;
export const refreshTokenSelector = (state) => state.auth.refreshToken;
