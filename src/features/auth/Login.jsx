import React, { useState } from "react"
import { Avatar, Button, Paper, Typography, Container, Grid } from "@mui/material"
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import Input from "../../components/Inputs/Input"

const Login = () => {

    const initialState = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        navigate('/dash')
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper elevation={3}>
                <Avatar>
                    <FontAwesomeIcon icon={faLock} />
                </Avatar>
                <Typography variant="h5">Sign In</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name='username' label='User Name' required handleChange={handleChange} autoFocus />
                        <Input name='password' label='Password' required handleChange={handleChange} type='password' />
                        <Button type="submit" fullWidth variant='contained' color='primary' >Sign In</Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Login
