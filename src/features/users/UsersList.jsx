import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery

    return (
        <div>
            {
                isLoading ? (
                    <p>Loading ...</p>
                ) : isSuccess ? (
                    users.map(user => (user))
                ) : isError ? (
                    error
                ) : console.log(users, isLoading, isSuccess, isError, error)
            }

        </div>
    )
}

export default UsersList
