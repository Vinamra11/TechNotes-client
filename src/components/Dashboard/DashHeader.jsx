import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

const DashHeader = () => {

    const handleLogout = () => {
        console.log('logout')
    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Typography color='inherit' variant="h6" component={Link} to='/dash' sx={{ textDecoration: 'none' }}>
                            TechNotes
                        </Typography>
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default DashHeader
