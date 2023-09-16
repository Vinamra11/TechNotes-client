import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"

import { Avatar, Button, Paper, Typography, Container, Grid, FormGroup, FormControlLabel, Checkbox } from "@mui/material"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'

import Input from "../../components/Inputs/Input"
import MultipleSelectCheckmarks from "../../components/Inputs/MultipleSelectCheckmarks"


import ROLES from "../../config/roles"

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

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

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        // console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = (event) => {
        const {
            target: { value },
        } = event;
        const selectValue = typeof value === 'string' ? value.split(',') : value
        setRoles(selectValue)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES)

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            {(isError || isDelError) && errContent}

            <Container component='main' maxWidth='xs'>
                <Paper elevation={3}>
                    <Avatar>
                        <FontAwesomeIcon icon={faUserPen} />
                    </Avatar>
                    <Typography variant="h5">Editing a User</Typography>
                    <form onSubmit={onSaveUserClicked}>
                        <Grid container spacing={2}>
                            <Input
                                name='username'
                                label='User Name'
                                value={username}
                                required
                                handleChange={onUsernameChanged}
                                autoFocus
                            />
                            <Input
                                name='password'
                                label='Password'
                                value={password}
                                handleChange={onPasswordChanged}
                                type='password'
                            />
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name='active'
                                            checked={active}
                                            onChange={onActiveChanged}
                                        />
                                    }
                                    label="Active"
                                />
                            </FormGroup>
                            <MultipleSelectCheckmarks
                                items={options}
                                label='Roles'
                                labelId="rolesLabel"
                                id='roles'
                                valueSelected={roles}
                                handleChange={onRolesChanged}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant='contained'
                                color='primary'
                                disabled={!canSave}
                            >
                                Save User
                            </Button>
                            <Button
                                fullWidth
                                variant='contained'
                                color='error'
                                onClick={onDeleteUserClicked}
                            >
                                Delete User
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Container>



        </>
    )

    return content
}
export default EditUserForm