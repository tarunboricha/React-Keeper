import React, { useState } from "react";
import Header from "./components/Header"
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";

function App() {
  
const [notes, setNotes] = useState([]);

const addNote = (newNote) => {
  setNotes(prevNotes => [...prevNotes, newNote]);
}; 

  return (
    <div className="App">
      <Header></Header>

      <CreateArea onAdd={addNote}> </CreateArea>

      <div className="row align-item-start" style={{ width: '98%', margin: '0 1%', minHeight: '23vh' }}>
      {notes.map((note, index) => (
        <Note key={index} title={note.title} content={note.content} />
      ))}
      </div>
           
      <Footer></Footer>
    </div>
  );
}

export default App;