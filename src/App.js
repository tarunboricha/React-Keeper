import React from "react";
import Header from "./components/Header"
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";

function App() {

  const name =0;
  return (
    <div className="App">
      <Header></Header>
      <CreateArea></CreateArea>
      <div className="row align-items-start" style={{width:'98%', margin:'0 1%', minHeight:'23vh'}}>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
