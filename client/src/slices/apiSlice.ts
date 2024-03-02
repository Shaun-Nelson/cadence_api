import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Playlist"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/api/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getMyPlaylists: builder.query({
      query: () => "/api/playlists",
      providesTags: ["Playlist"],
    }),
  }),
});
