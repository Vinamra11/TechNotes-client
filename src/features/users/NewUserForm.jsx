import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"

import { Avatar, Button, Paper, Typography, Container, Grid } from "@mui/material"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import Input from "../../components/Inputs/Input"
import MultipleSelectCheckmarks from "../../components/Inputs/MultipleSelectCheckmarks"


import ROLES from "../../config/roles"

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState([ROLES.Employee])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = (event) => {
        const {
            target: { value },
        } = event;
        const selectValue = typeof value === 'string' ? value.split(',') : value
        setRoles(selectValue)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        // console.log(canSave, roles.length, validUsername, validPassword, isLoading)
        if (canSave) {
            // console.log({ username, password, roles })
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES)

    const content = (
        <>
            {isError && error?.data?.message}

            <Container component='main' maxWidth='xs'>
                <Paper elevation={3}>
                    <Avatar>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Avatar>
                    <Typography variant="h5">Creating a User</Typography>
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
                                required
                                handleChange={onPasswordChanged}
                                type='password'
                            />
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
                                Create User
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )

    return content
}

export default NewUserForm