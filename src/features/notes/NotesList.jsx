import React from 'react'
import { useGetNotesQuery } from './notesApiSlice'

import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material'

import Note from './Note'

const NotesList = () => {

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery()

    // console.log(notes, isLoading, isSuccess, isError, error)

    const content = (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="notes table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ticket Number</TableCell>
                        <TableCell align="right">Completed</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Created By</TableCell>
                        <TableCell align="right">Created At</TableCell>
                        <TableCell align="right">Updated At</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notes?.ids.map(noteId => <Note key={noteId} noteId={noteId} />)}
                </TableBody>
            </Table>
        </TableContainer>

    )

    return (
        <div>
            {
                isLoading ? (
                    <p>Loading ...</p>
                ) : isSuccess ? (
                    content
                ) : isError ? (
                    error
                ) : console.log(notes, isLoading, isSuccess, isError, error)
            }

        </div>
    )
}

export default NotesList