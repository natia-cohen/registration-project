import React from "react"
import logo from "../assets/images/Logo.png";
import "../assets/styles/RegisterLogo.css"

export function RegisterLogo() {
  return (
    <div className="register-logo">
      <img src={logo} alt="Logo" />
    </div>
  )
}