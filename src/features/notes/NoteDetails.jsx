import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { useParams } from 'react-router-dom'

const NoteDetails = () => {

    //call getNotes to init data
    //now working with direct params
    //dont know if its the corrent method
    //or it enev needs to be done
    //removing the init will decrese shareablity of the note
    //but makes it secure

    const noteId = useParams().id
    const noteData = useSelector(state => selectNoteById(state, noteId))

    console.log(noteId, noteData)
    return (
        <div>
            {noteData?.title}
        </div>
    )
}

export default NoteDetails
