import React, { useState, useEffect } from "react";
import "../src/App.css"
import Header from "./components/Header"
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";

function App() {
  const [buttonname, updateButton] = useState("Add");
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    note_id: undefined,
    title: "",
    content: ""
  });
  useEffect(() => {
    let notesdata = localStorage.getItem('notes');
    if (notesdata) {
      setNotes(JSON.parse(notesdata));
    }
  }, []);

  useEffect(() => {
    if (notes.length) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  function addNote() {
    setNotes(prevNotes => {
      return [...prevNotes, note];
    });
  }

  const deleteNote = (id) => {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    if (notes.length === 1) {
      localStorage.removeItem('notes')
    }
    setNote({
      title: "",
      content: ""
    });
    updateButton("Add");
  }
  const editNote = (title, content, id) => {
    setNote({
      note_id: id,
      title: title,
      content: content
    })
    updateButton("Update");
  }

  const update = () => {
    notes[note.note_id].title = note.title;
    notes[note.note_id].content = note.content;
    localStorage.setItem('notes', JSON.stringify(notes));
    updateButton("Add");
    setNote({
      title: "",
      content: ""
    })
  }

  return (
    <div className="App">
      <Header></Header>

      <CreateArea onAdd={addNote} onUpdate={update} note={note} setNote={setNote} button={buttonname}> </CreateArea>

      <div className="note-container row align-items-start">
        {notes.map((note, index) => (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        ))}
      </div>

      <Footer notes={notes}></Footer>
    </div>
  );
}

export default App;