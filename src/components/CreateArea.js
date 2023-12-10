import React from "react";

function CreateArea() {

    return (
        <div className="create-area">
            <input type="text" placeholder="Title" id="title" />
            <textarea placeholder="Take a note..." id="content" name="" rows="3"></textarea>
            <button>Add</button>
        </div>
    );
}

export default CreateArea;