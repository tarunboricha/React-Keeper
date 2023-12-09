import React, { useState } from "react";
import Header from "./components/Header"
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";

function App() {
  const [button, setButton] = useState("Add");
  const [note, setNote] = useState({
    id: undefined,
    title: "",
    content: ""
  });
  const [notes, setNotes] = useState([]);

  function addNote() {
    console.log(note);
    setNotes(prevNotes => {
      return [...prevNotes, note]
    });

    setNote({
      title: "",
      content: ""
    });
  }

  function editNote(note) {
    setNote({
      id: note.id,
      title: note.title,
      content: note.content
    });
    setButton("Update");
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function updateNote() {
    notes[note.id].title = note.title;
    notes[note.id].content = note.content;
    setButton("Add");
    setNote({
      title: "",
      content: ""
    });
  }

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <Header></Header>
      <CreateArea setNote={setNote} note={note} onAdd={addNote} onUpdate={updateNote} button={button}></CreateArea>
      <div className="row align-items-start" style={{ width: '98%', margin: '0 1%' }}>
        {
          notes.map((note, index) => {
            return (
              <Note key={index} id={index} title={note.title} content={note.content} editNote={editNote} deleteNote={deleteNote}></Note>
            );
          })
        }
      </div>
      <Footer notes={notes}></Footer>
    </div>
  );
}

export default App;
