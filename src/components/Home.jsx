import React ,{useContext}from "react";
import noteContext from "../context/notes/notecontext";
import Notes from "./Notes";

export const Home = (props) => {
    const context = useContext(noteContext);
    const {notes,addnote}=context;
    const {showAlert}=props;
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  );
};
