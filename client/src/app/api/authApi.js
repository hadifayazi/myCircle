import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    }),
  }),
});

export const { useLoginMutation } = authApi;
