import { Link } from "react-router-dom"
import { Button } from "@mui/material"

const DashHeader = () => {
    return (
        <div>
            DashHeader-NavBar
            <Link to='/dash'>Tech Notes</Link>

            <p>User : Status : </p>
            <Button>Logout</Button>
        </div>
    )
}

export default DashHeader
