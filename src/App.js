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
    <div className="App" style={{position:'relative', minHeight:'100vh'}}>
      <Header></Header>

      <CreateArea onAdd={addNote}> </CreateArea>

      <div className="row align-items-start" style={{ width: '98%', margin: '0 1%'}}>
      {notes.map((note, index) => (
        <Note key={index} title={note.title} content={note.content} />
      ))}
      </div>
           
      <Footer notes={notes}></Footer>
    </div>
  );
}

export default App;