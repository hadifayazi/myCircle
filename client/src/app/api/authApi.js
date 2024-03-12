import { jwtDecode } from "jwt-decode";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryReauthorized } from "../services/requestHeaders";
import {
  setToken,
  setUser,
  clearLoginError,
  setLoginError,
} from "../../features/auth/authSlice";

const baseurl = "http://127.0.0.1:8000/api/v1/users/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: (args, api, extraOptions) =>
    baseQueryReauthorized(args, api, extraOptions, baseurl),
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
    signup: builder.mutation({
      query: (userData) => ({
        url: "signup",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => "user",
      providesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "user",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    getUser: builder.query({
      query: (username) => {
        return {
          url: `user/${username}`,
          method: "GET",
        };
      },
    }),
    searchUsers: builder.query({
      query: (searchQuery) => `search/?search=${searchQuery}`,
      invalidatesTags: ["user"],
    }),
    getRecommendations: builder.query({
      query: () => "recommendations",
    }),
    follow: builder.mutation({
      query: (username) => ({
        url: `follow`,
        method: "POST",
        body: { username },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
  useGetUserQuery,
  useUpdateProfileMutation,
  useSearchUsersQuery,
  useGetRecommendationsQuery,
  useFollowMutation,
} = authApi;
