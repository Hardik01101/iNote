import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notecontext";
import Notes from "./Notes";
const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setnote({title:"",description:"",tag:""});
    props.showAlert("Note added successfully","success");
  };

  const handlechange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={handlechange}
              name="title" minLength={5} required value={note.title}/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="description" name="description" onChange={handlechange}
              minLength={5} required value={note.description}/>
          </div>

          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Tag
            </label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={handlechange} value={note.tag}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleclick} disabled={note.title.length < 5 ||
            note.description.length < 5}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;