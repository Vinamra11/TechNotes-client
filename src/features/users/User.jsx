import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

import { useNavigate } from 'react-router-dom'

import { Button, TableCell, TableRow, Checkbox } from '@mui/material'
import { useState } from 'react'

const User = ({ userId }) => {
    const userData = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const [check, setCheck] = useState(userData.active)
    const handleCheckChange = () => setCheck(prev => !prev) //toDO change to Api update call

    // {"_id":"64ea88fd299dbb2b264963c9","username":"Admin1","active":true,"roles":["Employee","Manager","Admin"],"__v":0,"id":"64ea88fd299dbb2b264963c9"}

    return (
        <TableRow
            key={userData.id}
            sx={{ '&:last-child td, &:-chlastild th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Checkbox name='active' checked={userData.active} onChange={handleCheckChange} />
            </TableCell>
            <TableCell align="right">{userData.username}</TableCell>
            <TableCell align="right">{userData.roles.join(" , ")}</TableCell>
            <TableCell align="right"><Button onClick={handleEdit} > Edit</Button></TableCell>
        </TableRow>
    )
}

export default User
