import React from "react";

function CreateArea() {
    return (
        <div class="create-area">
        <input type="text" placeholder="Title"/>
        <textarea placeholder="Take a note..." name="" rows="3"></textarea>
        <button>Add</button>
    </div>
    );
}

export default CreateArea;