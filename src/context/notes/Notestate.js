import notecontext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];

  const [notes, setnotes] = useState(notesinitial);

  const getallnotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },


    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  const addnote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })

    });
    const json = await response.json();
    console.log(json);
    console.log("Adding a new note");
    const note = json;
    console.log("Note added:"+note);
    setnotes(notes.concat(note));
  };

  const deletenote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

    });
    const json = response.json();
    console.log(json);
    console.log("Delete note id" + id);
    const newnotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setnotes(newnotes);
  };

  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })

    });
    const json = response.json();
    console.log(json);


    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setnotes(newnotes);
  };
  return (
    <notecontext.Provider value={{ notes, addnote, editnote, deletenote, getallnotes }}>
      {props.children}
    </notecontext.Provider>
  );
}
export default NoteState;
