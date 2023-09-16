import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'

import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material'


import User from './User'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined, {//options // null or undefined both works for first option
        pollingInterval: 60000,//60sec -> 60000 mlliseconds
        refetchOnFocus: true,//changing ang comming back to browser window
        refetchOnMountOrArgChange: true//remount
    })

    // console.log(users, isLoading, isSuccess, isError, error)
    // {"_id":"64ea88fd299dbb2b264963c9","username":"Admin1","active":true,"roles":["Employee","Manager","Admin"],"__v":0,"id":"64ea88fd299dbb2b264963c9"}

    const content = (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="notes table">
                <TableHead>
                    <TableRow>
                        <TableCell>Active</TableCell>
                        <TableCell align="right">User Name</TableCell>
                        <TableCell align="right">Roles</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.ids.map(userId => <User key={userId} userId={userId} />)}
                </TableBody>
            </Table>
        </TableContainer>

    )

    return (
        <div>
            {
                isLoading ? (
                    <p>Loading ...</p>
                ) : isSuccess ? (
                    content
                ) : isError ? (
                    error
                ) : console.log(users, isLoading, isSuccess, isError, error)
            }

        </div>
    )
}

export default UsersList
