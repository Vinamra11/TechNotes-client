import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from 'react-router-dom'

import { Button, TableCell, TableRow, Checkbox } from '@mui/material'
import { useCallback, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"

const User = ({ userId }) => {
    const userData = useSelector(state => selectUserById(state, userId))

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const [active, setActive] = useState(userData.active)


    const onActiveChanged = async () => {
        const activeToSave = !active //as setActive takes time to update the state, this is recommended by react docs
        setActive(activeToSave)
        await updateUser({ id: userData.id, active: activeToSave })
    }


    const onDeleteUserClicked = async () => {
        await deleteUser({ id: userData?.id })
    }
    // {"_id":"64ea88fd299dbb2b264963c9","username":"Admin1","active":true,"roles":["Employee","Manager","Admin"],"__v":0,"id":"64ea88fd299dbb2b264963c9"}

    return (
        <TableRow
            key={userData.id}
            sx={{ '&:last-child td, &:-chlastild th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Checkbox name='active' checked={userData.active} onChange={onActiveChanged} />
            </TableCell>
            <TableCell align="right">{userData.username}</TableCell>
            <TableCell align="right">{userData.roles.join(" , ")}</TableCell>
            <TableCell align="right"><Button onClick={handleEdit} >  <FontAwesomeIcon icon={faPenToSquare} /></Button></TableCell>
            <TableCell align="right"><Button onClick={onDeleteUserClicked} >  <FontAwesomeIcon icon={faTrashCan} /></Button></TableCell>
        </TableRow>
    )
}

export default User
