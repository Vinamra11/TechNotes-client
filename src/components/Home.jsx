import { Link } from "react-router-dom"
import { Container, Grid, Paper, Typography } from '@mui/material'

const Home = () => {
    const id = 1 // till login is done
    return (

        <Paper elevation={3}>
            <Grid container direction="column" rowSpacing={2}>

                <Grid item>
                    <Typography variant="h4" p >Welcome User</Typography>
                </Grid>
                <Grid item > {/*p -> padding hoe to line break*/}
                    <Typography to='/dash/notes' component={Link} p sx={{ textDecoration: 'none' }}> View Notes</Typography>
                </Grid>
                <Grid item>
                    <Typography to='/dash/users' component={Link} p sx={{ textDecoration: 'none' }}>View Users</Typography>
                </Grid>
                <Grid item>
                    <Typography to='/dash/notes/new' component={Link} p sx={{ textDecoration: 'none' }}>Add Note</Typography>
                </Grid>
                <Grid item>
                    <Typography to='/dash/users/new' component={Link} p sx={{ textDecoration: 'none' }}>Add User</Typography>
                </Grid>
                <Grid item>
                    <Typography to={`/dash/users/${id}/changepassword`} component={Link} p sx={{ textDecoration: 'none' }}>Change Password</Typography>
                </Grid>
            </Grid>
        </Paper>

    )
}

export default Home
