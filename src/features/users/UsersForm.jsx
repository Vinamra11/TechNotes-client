import React, { useState } from "react"
import { Avatar, Button, Paper, Typography, Container, Grid, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { faUserPen, faUserPlus, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

import Input from "../../components/Inputs/Input"
import MultipleSelectCheckmarks from "../../components/Inputs/MultipleSelectCheckmarks"

const UsersForm = ({ passwordForm, editUser }) => {

    const rolesItem = ['Employee', 'Manager', 'Admin']

    let icon, formHeading, submitHeading, initialState, userId

    if (passwordForm) {
        //EditPassword Employee
        icon = faKey
        formHeading = "Changing Password"
        submitHeading = "Change Password"
        userId = useParams().id
        initialState = { "oldPassword": "", "newPassword": "", "confirmNewPassword": "" }
    } else if (editUser) {
        //editUser
        icon = faUserPen
        formHeading = "Editing the User"
        submitHeading = "Edit User"
        userId = useParams().id
        const userData = useSelector(state => selectUserById(state, userId))
        initialState = userData
    } else {
        //newuser
        icon = faUserPlus
        formHeading = "Creating a User"
        submitHeading = "Create User"
        initialState = { "username": "", "active": true, "roles": ["Employee"], "password": "" }
    }

    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        navigate('/dash/users')
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (event) => {
        const {
            target: { value },
        } = event;
        const selectValue = typeof value === 'string' ? value.split(',') : value
        // Multiselect doesnt gives name
        handleChange({ target: { name: 'roles', value: selectValue } })
    }

    const handleCheckChange = () => setFormData((prev) => ({ ...prev, active: !prev.active }))

    return (
        <Container component='main' maxWidth='xs'>
            <Paper elevation={3}>
                <Avatar>
                    <FontAwesomeIcon icon={icon} />
                </Avatar>
                <Typography variant="h5">{formHeading}</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            passwordForm ? (
                                <>
                                    <Input name='oldPassword' label='Old Password' required handleChange={handleChange} type='password' autofocus />
                                    <Input name='newPassword' label='New Password' required handleChange={handleChange} type='password' />
                                    <Input name='confirmNewPassword' label='Confirm New Password' required handleChange={handleChange} type='password' />
                                </>
                            ) : (
                                <>
                                    <Input
                                        name='username'
                                        label='User Name'
                                        value={formData?.username}
                                        required={!editUser}
                                        handleChange={handleChange}
                                        autoFocus
                                    />
                                    <Input
                                        name='password'
                                        label='Password'
                                        required={!editUser}
                                        handleChange={handleChange}
                                        type='password'
                                    />
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox name='active' checked={formData?.active} onChange={handleCheckChange} />} label="Active" />
                                    </FormGroup>
                                    <MultipleSelectCheckmarks
                                        items={rolesItem}
                                        label='Roles'
                                        labelId="rolesLabel"
                                        id='roles'
                                        valueSelected={formData?.roles}
                                        handleChange={handleSelectChange}
                                    />
                                </>
                            )
                        }
                        <Button type="submit" fullWidth variant='contained' color='primary' >{submitHeading}</Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default UsersForm
