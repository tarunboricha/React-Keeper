import React from "react";

const CreateArea = (props) => {

    const handleChange = (event) => {
        const { name, value } = event.target;
        props.setNote((prevNote) => ({ ...prevNote, [name]: value }));
    };

    const submit = () => {
        if (props.note.title === "") {
            document.querySelectorAll("input")[0].value = "Please add title here";
            setTimeout(() => {
                document.querySelectorAll("input")[0].value = "";
            }, 1500);
            return;
        }
        if (props.note.content === "") {
            document.querySelectorAll("textarea")[0].value = "Please add content here";
            setTimeout(() => {
                document.querySelectorAll("textarea")[0].value = "";
            }, 1500);
            return;
        }
        if (props.button === "Add") {
            props.onAdd();
            props.setNote({
                title: "",
                content: ""
            });
        }
        else {
            props.onUpdate();
        }
    }

    return (
        <div className="create-area">
            <input onChange={handleChange} name="title" value={props.note.title} type="text" placeholder="Title" />
            <textarea onChange={handleChange} value={props.note.content} placeholder="Take a note..." name="content" rows="3"></textarea>
            <button style={{ width: props.button === "Add" ? "2.8rem" : "4rem", height: props.button === "Add" ? "2.8rem" : "4rem" }} onClick={submit}>{props.button}</button>
        </div>
    );
}

export default CreateArea;