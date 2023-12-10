import React from "react";

function Note() {

    return (
        <div className="col-sm-3 note" style={{ width: '23%', maxWidth: '100%' }}>
            <h1>This is title</h1>
            <p>Hello!! This is content of note....</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
};

export default Note;