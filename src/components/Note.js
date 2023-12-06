import React from "react";

function Note(props) {
    return (
        <div class="note col-sm-3" style={{width:'23%', maxWidth:'100%'}}>
        <h1>{props.t}</h1>
        <p>{props.c}</p>
        <button>Update</button>
        <button>Delete</button>
    </div>
    );
};

export default Note;