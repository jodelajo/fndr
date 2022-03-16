import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import Auth from "./Pages/Auth/Auth";
import AddAgency from "./Pages/AddAgency/AddAgency";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/new-admin" element={<Auth />} />
        <Route path="/add-agency" element={<AddAgency />} />
      </Routes>
    </div>
  );
}

export default App;
