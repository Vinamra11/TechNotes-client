import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from "@fortawesome/free-solid-svg-icons"

import { Avatar, Button, Paper, Typography, Container, Grid, InputLabel, FormControl, Select, MenuItem } from "@mui/material"
import { Textarea } from '@mui/joy'
import Input from "../../components/Inputs/Input"

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id) // for testing

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading //disable save button

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ userId, title, text })
        }
    }

    const options = users.map(user => {  // breing multi select from users form make it only available for manager and admin
        return (
            <MenuItem
                key={user.id}
                value={user.id}
            > {user.username}</MenuItem >
        )
    })

    const content = (
        <Container component='main' maxWidth='xs'>

            {error?.data?.message /* TODO: Make a pop up or something */}

            <Paper elevation={3}>
                <Avatar>
                    <FontAwesomeIcon icon={faPen} />
                </Avatar>
                <Typography variant="h5">Creating a Note</Typography>
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
                        <Button type="submit" fullWidth variant='contained' color='primary' >Create Note</Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )

    return content
}

export default NewNoteForm