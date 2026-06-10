import  { USERS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';


export const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/auth`,
            method: 'POST',
            body: data
         })
      }),
      logout: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST'
         }),
      }),
      register: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}`,
            method: 'POST',
            body: data
         })
      }),
      profile: builder.mutation({
         query: (data) => ({
            url: USERS_URL + `/profile`,
            method: 'PUT',
            body: data
         })
      }),
      getUsers: builder.query({
         query: () => ({
            url: USERS_URL
         }),
         providesTags: (result) =>
            result
               ? [
                    { type: 'Users', id: 'LIST' },
                    ...result.map((user) => ({ type: 'User', id: user._id })),
                 ]
               : [{ type: 'Users', id: 'LIST' }],
         keepUnusedDataFor: 5
      }),
      deleteUser: builder.mutation({
         query: (userId) => ({
            url: USERS_URL + `/${userId}`,
            method: 'DELETE'
         }),
         invalidatesTags: (result, error, userId) => [
            { type: 'User', id: userId },
            { type: 'Users', id: 'LIST' },
         ],
      }),
      getUserDetails: builder.query({
         query: (userId) => ({
            url: USERS_URL + `/${userId}`
         }),
         keepUnusedDataFor: 5,
         providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
      }),
      updateUser: builder.mutation({
         query: (data) => ({
            url: USERS_URL + `/${data.userId}`,
            method: 'PUT',
            body: data
         }),
         invalidatesTags: (result, error, data) => [
            { type: 'User', id: data.userId },
            { type: 'Users', id: 'LIST' },
         ],
      })
   }),
});

export const { 
   useLoginMutation, 
   useLogoutMutation, 
   useRegisterMutation, 
   useProfileMutation,
   useGetUsersQuery,
   useDeleteUserMutation,
   useGetUserDetailsQuery,
   useUpdateUserMutation
} = usersApiSlice;