import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Login from './features/auth/Login'

import Prefetch from './features/auth/prefetch'

import DashLayout from './components/Dashboard/DashLayout'
import Home from './components/Home'


import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import ChangePassword from './features/users/ChangePassword'

import NotesList from './features/notes/NotesList'
import NotesForm from './features/notes/NotesForm'
import NoteDetails from './features/notes/NoteDetails'
import NewNote from './features/notes/NewNote'
import EditNote from './features/notes/EditNote'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} />

        <Route element={<Prefetch />} >{/*Start of Protected routes */}
          <Route path='dash' element={<DashLayout />}>

            <Route index element={<Home />} />

            <Route path='notes' >
              <Route index element={<NotesList />} />
              <Route path='new' element={<NewNote />} />
              <Route path=':id' element={<EditNote />} />
            </Route>

            <Route path='note/:id' element={<NoteDetails />} />

            <Route path='users'>
              <Route index element={<UsersList />} />
              <Route path='new' element={<NewUserForm />} />
              <Route path=':id/changePassword' element={<ChangePassword />} />
              <Route path=':id' element={<EditUser />} />
            </Route>

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