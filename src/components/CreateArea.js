import React from "react";

function CreateArea(props) {

    function changenote(event) {
        props.setNote({...props.note, [event.target.id] : event.target.value});
    }

    return (
        <div className="create-area">
            <input type="text" placeholder="Title" onChange={changenote} value={props.note.title} id="title" />
            <textarea placeholder="Take a note..." onChange={changenote} value={props.note.content} id="content" name="" rows="3"></textarea>
            <button onClick={props.onAdd}>Add</button>
        </div>
    );
}

export default CreateArea;