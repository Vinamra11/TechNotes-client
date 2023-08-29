import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({
        // getUsers: builder.query({
        //     query: () => 'users',
        //     providesTags: ['User']
        // }),
        // getNotes: builder.query({
        //     query: () => 'notes',
        //     providesTags: ['Note']
        // }),
    })
})

// export const {
//     useGetNotesQuery,
//     useGetUsersQuery
// } = apiSlice