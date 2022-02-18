import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import HelmetSearch from "./components/Helmet/HelmetSearch";

function App() {
  return (
    <div className="App">
      <HelmetSearch
        title="FNDR - Vind je digital agency in de FNDR-app"
        titleContent="Zoek op locatie en bedrijfsgrootte"
        descriptionContent="Zoek je een agency in de FNDR-app"
        URLContent="https://fndr.netlify.app/"
        imageContent="../../../public/fndr_image.png"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
