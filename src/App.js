import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import AddAgency from "./Pages/AddAgency/AddAgency";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add_agency" element={<AddAgency />} />
      </Routes>
    </div>
  );
}

export default App;
