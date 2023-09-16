import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSave, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"//AddDeleteoption to NotesList

import { Avatar, Button, Paper, Typography, Container, Grid, InputLabel, FormControl, Select, MenuItem, FormControlLabel, FormGroup, Checkbox } from "@mui/material"
import { Textarea } from '@mui/joy'
import Input from "../../components/Inputs/Input"

const EditNoteForm = ({ note, users }) => {

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.userId)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <MenuItem
                key={user.id}
                value={user.id}

            > {user.username}</MenuItem >
        )
    })

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <Container component='main' maxWidth='xs'>

            {isError && errContent/* TODO: Make a pop up or something */}

            <Paper elevation={3}>
                <Avatar>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Avatar>
                <Typography variant="h5">Editing a Note</Typography>
                <form onSubmit={onSaveNoteClicked}>
                    <Grid container spacing={2}>
                        <Input name='title' label='Title' value={title} handleChange={onTitleChanged} autoFocus />
                        <Textarea name='text' label='Text' value={text} onChange={onTextChanged} placeholder="Note Text here..." minRows={6} maxRows={6} sx={{ width: '100%' }} />
                        <FormControl fullWidth>
                            <InputLabel id="user-select-label">User</InputLabel>
                            <Select
                                labelId="user-select-label"
                                id="user-select"
                                value={userId}
                                label="User"
                                onChange={onUserIdChanged}
                            >
                                {options}
                            </Select>
                        </FormControl>

                        <FormGroup>
                            <FormControlLabel control={<Checkbox name='completed' checked={completed} onChange={onCompletedChanged} />} label="Completed" />
                            <Typography variant="p">Assigned to {note.username}</Typography>
                            <Typography variant="p">Created:<br /> {created}</Typography>
                            <Typography variant="p">Updated:<br /> {updated}</Typography>
                        </FormGroup>

                        <Button type="submit" fullWidth variant='contained' color='primary' >Save Note</Button>
                        <Button fullWidth variant='contained' color='error' onClick={onDeleteNoteClicked}>Delete Note</Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )

    return content
}

export default EditNoteForm