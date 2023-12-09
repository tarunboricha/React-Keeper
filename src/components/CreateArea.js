import React from "react";

function CreateArea(props) {

    function changenote(event) {
        props.setNote({ ...props.note, [event.target.id]: event.target.value });
    }

    function submit() {
        if (props.button === "Add") {
            props.onAdd();
        }
        else {
            props.onUpdate();
        }
    }

    return (
        <div className="create-area">
            <input type="text" placeholder="Title" onChange={changenote} value={props.note.title} id="title" />
            <textarea placeholder="Take a note..." onChange={changenote} value={props.note.content} id="content" name="" rows="3"></textarea>
            <button onClick={submit} style={{ height: props.button === "Add" ? '2.8rem' : '4rem', width: props.button === "Add" ? '2.8rem' : '4rem' }}>{props.button}</button>
        </div>
    );
}

export default CreateArea;