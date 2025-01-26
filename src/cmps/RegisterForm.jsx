import { useState } from "react";
import googleIcon from "../assets/images/google-icon.png"
import facebookIcon from "../assets/images/facebook-icon.png"

import "../assets/styles/RegisterForm.css"

export function RegisterForm({ credentials, handleChange, handleSubmit, isSignup, setIsSignup, handleFacebookLogin }) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPasswordSubmit = async (ev) => {
    ev.preventDefault()
    alert("Password reset link sent to " + email);
  }

  return (
    <form className="register-form" onSubmit={isForgotPassword ? handleForgotPasswordSubmit : handleSubmit}>
 
      <h2 className="form-title">
        {isForgotPassword ? "Reset Password" : isSignup ? "Sign Up" : "Log in"}
      </h2>


      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={isForgotPassword ? email : credentials.email}
          onChange={isForgotPassword ? (ev) => setEmail(ev.target.value) : handleChange}
          required
        />
      </div>


      {!isForgotPassword && (
        <div className="input-group password-input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <span className="toggle-password">👁</span>
        </div>
      )}


      {!isSignup && !isForgotPassword && (
        <a href="#" className="forgot-password" onClick={(e) => {
          e.preventDefault();
          setIsForgotPassword(true);
        }}>
          Forgot password?
        </a>
      )}

      {isSignup && (
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      )}


      <button type="submit" className="register-button">
        {isSignup ? "Sign Up" : isForgotPassword ? "Send Reset Link" : "Log in"}
      </button>

   
      {!isForgotPassword && (
        <div className="separator">
          <span>Or</span>
        </div>
      )}

      {!isForgotPassword && (
        <div className="social-login">
          <button className="social-button google-login">
          <img src={googleIcon} alt="Google" />
      
        </button>
        <button className="social-button facebook-login" onClick={handleFacebookLogin}>
          <img src={facebookIcon} alt="Facebook" />   
        </button>

        </div>
      )}

    
      {!isForgotPassword && (
        <p className="register-login-link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Log in" : "Have no account yet? Register"}
        </p>
      )}
    </form>
  );
}

