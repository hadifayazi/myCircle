import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryReauthorized } from "../services/requestHeaders";

const baseurl = "http://127.0.0.1:8000/api/v1/posts/";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: (args, api, extraOptions) =>
    baseQueryReauthorized(args, api, extraOptions, baseurl),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (pageParam) => {
        return {
          url: pageParam ? `?page=${pageParam}` : "",
        };
      },

      transformResponse: (response) => {
        const modifiedResults = response.results.map((post) => ({
          ...post,
          avatar: modifyAvatarURL(post.avatar),
        }));
        return { ...response, results: modifiedResults };
      },
      providesTags: ["Post"],
    }),
    addPost: builder.mutation({
      query: (post) => {
        return {
          url: "",
          method: "POST",
          body: post,
        };
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

const modifyAvatarURL = (avatar) => {
  const hostUrl = "http://127.0.0.1:8000";
  return `${hostUrl}${avatar}`;
};

export const { useGetPostsQuery, useAddPostMutation } = postsApi;
