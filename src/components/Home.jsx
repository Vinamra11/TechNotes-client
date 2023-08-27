import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Welcome user</h1>
            <p><Link to='/dash/notes'>View Notes</Link></p>
            <p><Link to='/dash/users'>View Users</Link></p>
        </div>
    )
}

export default Home
