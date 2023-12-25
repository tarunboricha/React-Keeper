import React, { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeScreen from "./pages/home-page";
import UserScreen from "./pages/user-page";

function App() {
  const [temp, setTemp] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        {temp ? <Route path="/React-Keeper" element={<HomeScreen setTemp={setTemp}></HomeScreen>} ></Route> : <Route path="/React-Keeper" element={<UserScreen setTemp={setTemp}></UserScreen>} ></Route>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
