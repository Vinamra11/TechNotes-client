import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { BottomNavigationAction, Box, BottomNavigation, Paper, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const onGoHomeClicked = () => navigate('/dash')

    const user = { name: 'Test', active: true }

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-In', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <Button color='inherit' onClick={onGoHomeClicked}>{<FontAwesomeIcon icon={faHouse} />}&nbsp;Home</Button>
        )
    }

    const [value, setValue] = useState(0)

    return (

        // <Box sx={{ pb: 7 }}>
        //     <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        //         <BottomNavigation
        //             showLabels
        //             value={value}
        //             onChange={(event, newValue) => {
        //                 setValue(newValue);
        //             }}
        //         >
        //             {goHomeButton}

        //             <Typography variant='p'>{today}</Typography>
        //         </BottomNavigation>
        //     </Paper>
        // </Box>

        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                {goHomeButton}
                <div style={{ flexGrow: 1 }}></div>
                <Typography variant='p' p> User: {user.name} </Typography>
                <Typography variant='p' p> Status: {user.active ? "Active " : "Inactive "} </Typography>
                <Typography variant='p' p>{today}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default DashFooter
