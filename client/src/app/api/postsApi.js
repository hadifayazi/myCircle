import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryReauthorized } from "../services/requestHeaders";

const baseurl = "http://127.0.0.1:8000/api/v1/posts/";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: (args, api, extraOptions) =>
    baseQueryReauthorized(args, api, extraOptions, baseurl),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "",
      providesTags: ["posts"],
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
