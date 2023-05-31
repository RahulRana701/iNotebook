import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

// useRef is a hook with whose help we can give reference to any one element


const Notes = () => {
    // now we will get those notes here from notestate.
    const context = useContext(noteContext)
    let navigate = useNavigate();
    const { notes, getnotes, editnote } = context;

    // we are making useEffect beacuse we want to fetch all the notes but by once.
    useEffect(() => {
        // WE ARE DOING THIS BECAUSE WE WANT KI AGR KOI HAMARI APPLICATION PR AAYE TO VO LOGIN KRE TBHI USE NOTES MILEGE. MEANS NOTES KO DEKH-
        // NE YA ADD KRNE SE PEHLE LOGIN KIJIYE YA SIGNUP
        if (localStorage.getItem('token') === true) {
            getnotes();
        }
        else {
            navigate('/login');
        }

    }, [])

    // intial value of ref has been set to one 
    const ref = useRef(null);
    const refclose = useRef(null);

    const [note, setnote] = useState({ id: "", etitle: "", edescription: "" })

    const updatenote = (currentnote) => {
        ref.current.click();
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description });
    }

    const handleclick = () => {
        console.log("updating a note...", note);
        // iska mtlb hai bhai mere notes ko update krdo ...
        editnote(note.id, note.etitle, note.edescription);
        // ye update note button ko dabane ke baad modal close hojaye uske liye , ye hum close button ka refer
        // ence leke kr rahe hai 
        refclose.current.click();
    }

    const onChange = (e) => {
        e.preventDefault();
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <formc className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle"
                                        value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                                </div>
                            </formc>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>




            {/* we will try to display our notes here */}
            <div className='row my-3'>
                <h2 className='text-center my-3'>YOUR NOTES</h2>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updatenote={updatenote} note={note} />
                    })
                }
            </div>

        </>
    )
}

export default Notes
