import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: {
      id: null,
      username: "",
      avatar: "",
    },
    accessToken: null,
    refreshToken: null,
    loginError: {
      message: "",
      status: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
    setLoginError: (state, action) => {
      state.loginError = {
        message: action.payload.message,
        status: action.payload.status,
      };
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, setToken, logout, setLoginError, clearLoginError } =
  authSlice.actions;
export const userSelector = (state) => state.auth.user;
export const accessTokenSelector = (state) => state.auth.accessToken;
export const refreshTokenSelector = (state) => state.auth.refreshToken;
export const loginErrorSelector = (state) => state.auth.loginError;
