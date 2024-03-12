import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { postsApi } from "./api/postsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, postsApi.middleware),
});
setupListeners(store.dispatch);
