import React,{useContext} from "react";
import notecontext from "../context/notes/notecontext";

const Noteitem = (props) => {
  const context = useContext(notecontext);
  const { note ,updatenote} = props;
  const {deletenote}=context;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fas fa-edit mx-2" onClick={()=>{
              updatenote(note);
            }}></i>
            <i className="fas fa-trash-alt mx-2" onClick={()=>{
              deletenote(note._id);
              props.showAlert("Note deleted successfully","success");
            }}></i>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
