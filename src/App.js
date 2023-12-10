import React from "react";
import Header from "./components/Header"
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <Header></Header>
      <CreateArea></CreateArea>
      <div className="row align-items-start" style={{ width: '98%', margin: '0 1%' }}>
        <Note></Note>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
