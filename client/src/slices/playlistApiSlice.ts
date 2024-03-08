import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/playlists";

export const playlistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylists: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        withCredentials: true,
      }),
    }),
    createPlaylist: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        withCredentials: true,
      }),
    }),
    deletePlaylist: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "DELETE",
        body: data,
        withCredentials: true,
      }),
    }),
  }),
});

export const {
  useGetPlaylistsMutation,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistsApiSlice;
