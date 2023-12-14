import React from "react";

function Note({ title, content }) {
    return (
        <div class="note col-sm-3" style={{width:'23%', maxWidth:'100%'}}>
        <h1> {title} </h1>
        <p> {content} </p>
        <button> Update </button>
        <button> Delete </button>
    </div>
    );
};

export default Note;