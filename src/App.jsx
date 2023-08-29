import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Login from './features/auth/Login'

import DashLayout from './components/Dashboard/DashLayout'
import Home from './components/Home'

import UsersList from './features/users/UsersList'
import UsersForm from './features/users/UsersForm'

import NotesList from './features/notes/NotesList'
import NotesForm from './features/notes/NotesForm'
import NoteDetails from './features/notes/NoteDetails'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} />

        <Route path='dash' element={<DashLayout />}>
          <Route index element={<Home />} />

          <Route path='notes' >
            <Route index element={<NotesList />} />
            <Route path='new' element={<NotesForm />} />
            <Route path=':id' element={<NotesForm editNotes />} />
          </Route>

          <Route path='note/:id' element={<NoteDetails />} />

          <Route path='users'>
            <Route index element={<UsersList />} />
            <Route path='new' element={<UsersForm />} />
            <Route path='changePassword' element={<UsersForm passwordForm />} />
            <Route path=':id' element={<UsersForm editUser />} />
          </Route>

        </Route>{/* End of Protected routes*/}

        <Route path="*" Component={() => (
          <div>
            <h1>404 Page Not Found</h1>
          </div>
        )} />

      </Route>
    </Routes>
  )
}

export default App