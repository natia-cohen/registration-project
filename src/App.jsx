import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import {RegisterPage}  from "./pages/RegisterPage";
import "./assets/styles/App.css";

export function App() {
  return (

      <div className="App">
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>

  )
}


  