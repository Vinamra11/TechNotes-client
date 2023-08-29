import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'

import { Button, TableCell, TableRow, Checkbox } from '@mui/material'
import { useState } from 'react'

const Note = ({ noteId }) => {

    // use react-router to come to /note:id for params to work in this case
    // as redux store refreshes when page reloads
    // make onclick go to notedetails

    const noteData = useSelector(state => selectNoteById(state, noteId))


    const navigate = useNavigate()
    const handleEdit = () => navigate(`/dash/notes/${noteId}`)
    const showDetails = () => navigate(`/dash/note/${noteId}`)

    const created = new Date(noteData?.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'long' })

    const updated = new Date(noteData?.updatedAt).toLocaleString('en-IN', { day: 'numeric', month: 'long' })


    const [check, setCheck] = useState(noteData?.completed)
    const handleCheckChange = () => setCheck(prev => !prev) //toDO change to Api update call

    /* {"_id":"64ea8933299dbb2b264963d7","userId":"64ea88db299dbb2b264963c3","title":"Employee Note 2","text":"this is a great text again","completed":false,"ticket_num":502,"createdAt":"2023-08-26T23:22:27.901Z","updatedAt":"2023-08-26T23:22:27.901Z","__v":0,"username":"Employee1","id":"64ea8933299dbb2b264963d7"}
*/

    return (
        <TableRow
            key={noteData?.id}
            sx={{ '&:last-child td, &:-chlastild th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {noteData?.ticket_num}
            </TableCell>
            <TableCell align="right">
                <Checkbox name='active' checked={noteData?.completed} onChange={handleCheckChange} />
            </TableCell>
            <TableCell align="right" onClick={showDetails}>{noteData?.title}</TableCell>
            <TableCell align="right">{noteData?.username}</TableCell>
            <TableCell align="right">{created}</TableCell>
            <TableCell align="right">{updated}</TableCell>
            <TableCell align="right"><Button onClick={handleEdit} > Edit</Button></TableCell>
        </TableRow>

    )
}


export default Note