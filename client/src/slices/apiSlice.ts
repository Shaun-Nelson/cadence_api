import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "/api" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Playlist"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
        withCredentials: true,
      }),
    }),
    isLoggedIn: builder.query({
      query: () => "/login",
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => "/logout",
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    getPlaylists: builder.query({
      query: () => "/playlists",
      providesTags: ["Playlist"],
    }),
  }),
});
