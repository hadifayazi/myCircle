import { jwtDecode } from "jwt-decode";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setToken,
  setUser,
  clearLoginError,
  setLoginError,
} from "../../features/auth/authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/users/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "login",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(
        arg,
        {
          dispatch,
          queryFulfilled,
          // getState,
          // extra,
          // requestId,
          // getCacheEntry,
          // updateCachedData,
        }
      ) {
        try {
          {
            const response = await queryFulfilled;
            dispatch(setToken(response.data));
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);

            const user = jwtDecode(response.data.access);
            const { username, user_id, avatar } = user;
            dispatch(setUser({ id: user_id, username, avatar }));
            dispatch(clearLoginError());
          }
        } catch (error) {
          dispatch(
            setLoginError({
              status: error?.error?.status,
              message: error.error?.data?.detail,
            })
          );
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
