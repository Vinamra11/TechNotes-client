import React from 'react'

const NotesForm = ({ editNotes }) => {
    return (
        <div>
            {
                editNotes ? (
                    <p>Edit Note</p>
                ) : (
                    <p>New Note</p>
                )
            }
        </div>
    )
}

export default NotesForm
