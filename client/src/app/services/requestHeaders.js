import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "../../features/auth/authSlice";

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

export const baseQueryReauthorized = async (args, api, extraOptions) => {
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
