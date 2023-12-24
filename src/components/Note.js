import React from "react";

const Note = (props) => {
    const deletenote = () => {
        props.onDelete(props.note_id);
    }
    const editenote = () => {
        props.onEdit(props.title, props.content, props.note_id);
    }
    return (
        <div className="col-sm-3 note">
            <h1> {props.title} </h1>
            <p> {props.content} </p>
            <button onClick={deletenote}>Delete</button>
            <button onClick={editenote}>Edit</button>
        </div>
    );
};

export default Note;