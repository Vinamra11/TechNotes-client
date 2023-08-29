import React, { useState } from "react"
import { Avatar, Button, Paper, Typography, Container, Grid, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { FormControl, FormLabel, Textarea } from '@mui/joy'

import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { useParams } from 'react-router-dom'


import Input from "../../components/Inputs/Input"

const NotesForm = ({ editNotes }) => {

    const emptyState = { title: '', text: '', completed: false, ticket_num: 0, createdAt: "", updatedAt: "", username: "" }

    let initialState
    if (editNotes) {
        const noteId = useParams().id
        const noteData = useSelector(state => selectNoteById(state, noteId))
        initialState = noteData

    } else initialState = emptyState

    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        navigate('/dash/notes')
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCheckChange = () => setFormData((prev) => ({ ...prev, completed: !prev.completed }))

    return (
        <Container component='main' maxWidth='xs'>
            <Paper elevation={3}>
                <Avatar>
                    <FontAwesomeIcon icon={editNotes ? faPenToSquare : faPen} />
                </Avatar>
                <Typography variant="h5">{editNotes ? 'Editing' : 'Creating'} a Note</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {editNotes && <Typography variant="p">Ticket No. {formData?.ticket_num}</Typography>}
                        <Input name='title' label='Title' value={formData?.title} handleChange={handleChange} autoFocus />
                        <Textarea name='text' label='Text' value={formData?.text} onChange={handleChange} placeholder="Note Text here..." minRows={6} maxRows={6} sx={{ width: '100%' }} />
                        {
                            editNotes && (
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox name='completed' checked={formData?.completed} onChange={handleCheckChange} />} label="Completed" />
                                    <Typography variant="p">Created by {formData?.username}  at {formData?.createdAt}</Typography>
                                    {formData?.createdAt !== formData?.updatedAt && <Typography variant="p">Updated At {formData?.updatedAt}</Typography>}
                                </FormGroup>
                            )
                        }

                        <Button type="submit" fullWidth variant='contained' color='primary' >{editNotes ? 'Edit the' : 'Create a'} Note</Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default NotesForm
