import { apiSlice } from "./apiSlice";

const USERS_URL = "/api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        withCredentials: true,
      }),
    }),
    isLoggedIn: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/login`,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        withCredentials: true,
      }),
    }),
  }),
});

export const { useLoginMutation, useIsLoggedInMutation, useLogoutMutation } =
  usersApiSlice;
