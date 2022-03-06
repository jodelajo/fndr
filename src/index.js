import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import AuthContextProvider from "./context/AuthContext";
import AgencyContextProvider from "./context/AgencyContext";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <AuthContextProvider>
          <AgencyContextProvider>
            <App />
          </AgencyContextProvider>
        </AuthContextProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
