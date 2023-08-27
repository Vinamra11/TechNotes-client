import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const onGoHomeClicked = () => navigate('/dash')

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-In', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <Button onClick={onGoHomeClicked}><FontAwesomeIcon icon={faHouse} /></Button>
        )
    }

    return (
        <div>
            DashFooter
            {goHomeButton}
            {/* shift activeUser to header bring Time Here*/}
            <p>{today}</p>
        </div>
    )
}

export default DashFooter