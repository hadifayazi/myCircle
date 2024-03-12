import { jwtDecode } from "jwt-decode";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setToken,
  setUser,
  clearLoginError,
  setLoginError,
  logout,
} from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/v1/users/",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryReauthorized = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshTokenResponse = await baseQuery(
      {
        url: "refresh",
        method: "POST",
        body: {
          refresh: localStorage.getItem("refreshToken"),
        },
      },
      api,
      extraOptions
    );

    if (refreshTokenResponse?.data) {
      api.dispatch(setToken(refreshTokenResponse.data));
      const { access, refresh } = refreshTokenResponse.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Unable to refresh token, logging out");
      api.dispatch(logout());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryReauthorized,
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
