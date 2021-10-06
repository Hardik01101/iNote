import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import noteContext from "../context/notes/notecontext";
import Addnote from './Addnote';
import Noteitem from './Noteitem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getallnotes, editnote } = context;
    let history =useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getallnotes();
        }
        else{
            history.push("/login");
        }
    }, [])

    const [note, setnote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "General",
    });
    const handleclick = (e) => {
        console.log("Update", note);
        editnote(note.id, note.etitle, note.edescription, note.etag);
        ref1.current.click();
        props.showAlert("Note updated successfully","success");
    };

    const updatenote = (currentnote) => {
        ref.current.click();
        setnote({
            id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag
        });
       
    }
    const handlechange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };
    const ref = useRef(null);
    const ref1 = useRef(null);
    return (
        <>
            <Addnote showAlert={props.showAlert}/>

           


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp"
                                        value={note.etitle} onChange={handlechange} name="etitle" minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">
                                        Description
                                    </label>
                                    <input type="text" className="form-control" id="edescription" name="edescription"
                                        onChange={handlechange} value={note.edescription} minLength={5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">
                                        Tag
                                    </label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={handlechange}
                                        value={note.etag} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={ref1} type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick} disabled={note.etitle.length
                                < 5 || note.edescription.length < 5}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes'}
                </div>
                {notes.map((note) => {
                    return (<Noteitem key={note._id} updatenote={updatenote} note={note} showAlert={props.showAlert}/>)
                })}
            </div>
        </>
    )
}

export default Notes