import React from "react";

function Note({ title, content }) {
    return (
        <div class="col-sm-3 note">
            <h1> {title} </h1>
            <p> {content} </p>
            <button> Edit </button>
            <button> Delete </button>
        </div>
    );
};

export default Note;