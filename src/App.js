import React from "react";
import Header from "./components/Header"
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <CreateArea></CreateArea>
      <div className="row align-items-start" style={{width:'98%', margin:'0 1%', minHeight:'23vh'}}>
      <Note t="Hello" c="Hello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?Hello how are you?Hello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?elello how are you?ello how are you?lo how are you?ello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?elello how are you?ello how are you?lo how are you?ello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?elello how are you?ello how are you?lo how are you?ello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?elello how are you?ello how are you?lo how are you?ello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?elello how are you?ello how are you?lo how are you?ello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?"></Note>
        <Note t="Hello" c="Hello how are you?elello how are you?ello how are you?lo how are you?ello how are you?"></Note>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
