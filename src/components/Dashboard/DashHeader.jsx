import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

const DashHeader = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        console.log('logout')
        navigate('/')
    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Typography color='inherit' variant="h6" component={Link} to='/dash' sx={{ textDecoration: 'none' }}>
                            TechNotes
                        </Typography>
                    </Typography>

                    <Typography to='/dash/notes/new' component={Link} p sx={{ textDecoration: 'none' }} color='inherit' >Add Note</Typography>

                    <Typography to='/dash/users/new' component={Link} p sx={{ textDecoration: 'none' }} color='inherit'  >Add User</Typography>

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default DashHeader
