import React from "react";
import Header from "./components/Header"
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <CreateArea></CreateArea>
      <Note></Note>
      <Note></Note>
      <Note></Note>
      <Note></Note>
    </div>
  );
}

export default App;
