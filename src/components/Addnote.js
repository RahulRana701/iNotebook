import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'


const Addnote = () => {
    const context = useContext(noteContext)
    const { addnote } = context

    const [note, setnote] = useState({ title: "", description: "" })

    const handleclick = () => {

        addnote(note.title, note.description);
    }

    const onChange = (e) => {
        // this is , because we don't want our page to reload while adding a note
        e.preventDefault();
        setnote({ ...note, [e.target.name]: e.target.value })

        //    these ... is a spread operator , here we mean to say that jo note ki pehli properties hai unko aise
        // hi rehne do and unme ye add krdo properties jo hum de rahe hai 
        // above we said that jo bhi change ho raha hai name vo iske pure ki value ke barabar ho jaye.
    }

    return (
        <div>
            <h2 className='text-center my-3'>ADD NOTES !</h2>

            <formc className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </formc>

        </div>
    )
}

export default Addnote
