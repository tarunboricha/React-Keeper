import React, {useState} from "react";

function CreateArea({onAdd}) {
    const [note, setNote] = useState({ title: "", content: ''});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setNote ((prevNote) => ({...prevNote, [name]: value}));
    };

    const handleClick =() => {
        onAdd(note);
        setNote({title: "", content: "" })
    }

    return (
        <div class="create-area">
        <input onChange={handleChange} name="title" value={note.title} type="text" placeholder="Title"/>
        <textarea onChange={handleChange} value={note.content} placeholder="Take a note..." name="content" rows="3"></textarea>
        <button onClick={handleClick}>Add</button>
    </div>
    );
}

export default CreateArea;