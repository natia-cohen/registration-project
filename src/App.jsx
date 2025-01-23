import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import {RegisterPage}  from "./pages/RegisterPage"
import { WelcomePage } from "./pages/WelcomePage"
import "./assets/styles/App.css";

export function App() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1197510758417449", 
        cookie: true,
        xfbml: true,
        version: "v18.0", 
      });

      console.log("Facebook SDK Loaded!");
    };
  }, []);
  return (

      <div className="App">
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/welcome" element={<WelcomePage />} /> 
        </Routes>
      </div>

  )
}


  