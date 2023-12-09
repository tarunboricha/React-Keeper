import React from "react";

function Note(props) {

    function onDelete() {
        props.deleteNote(props.id);
    }

    function onEdit() {
        props.editNote(props);
    }

    return (
        <div className="col-sm-3 note" style={{ width: '23%', maxWidth: '100%' }}>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default Note;