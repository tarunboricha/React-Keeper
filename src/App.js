import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeScreen from "./pages/home-page";
import UserScreen from "./pages/user-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/React-Keeper" element={<HomeScreen></HomeScreen>} ></Route>
        <Route path="/React-Keeper/user" element={<UserScreen></UserScreen>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
