import { useState } from "react";
import googleIcon from "../assets/images/google-icon.png";
import facebookIcon from "../assets/images/facebook-icon.png";
import eyeIcon from "../assets/images/eyeIcon.png";

import { IoArrowBackSharp } from "react-icons/io5";

import { userService } from "../services/user";

import "../assets/styles/RegisterForm.css";

export function RegisterForm({
  credentials,
  handleChange,
  handleSubmit,
  isSignup,
  setIsSignup,
  handleFacebookLogin,
}) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleForgotPasswordSubmit(ev) {
    ev.preventDefault();
    try {
      await userService.sendPasswordResetEmail(email);
      alert("Password reset link sent to " + email);
      setIsForgotPassword(false);
    } catch (error) {
      alert("Failed to send reset email. Please try again.");
    }
  }

  return (
    <form
      className="register-form"
      onSubmit={isForgotPassword ? handleForgotPasswordSubmit : handleSubmit}
    >
      {isForgotPassword && (
        <button
          type="button"
          className="back-button"
          onClick={() => setIsForgotPassword(false)}
        >
          <IoArrowBackSharp />
        </button>
      )}
      <h2 className="form-title">
        {isForgotPassword ? "Reset Password" : isSignup ? "Sign Up" : "Log in"}
      </h2>

      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={isForgotPassword ? email : credentials.email}
          onChange={(ev) =>
            isForgotPassword ? setEmail(ev.target.value) : handleChange(ev)
          }
          required
        />
      </div>

      {!isForgotPassword && (
        <div className="input-group password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <img
            src={eyeIcon}
            alt="Show/Hide Password"
            className="toggle-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
      )}
      {/* {!isForgotPassword && (
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
      )} */}

      {!isSignup && !isForgotPassword && (
        <a
          href="#"
          className="forgot-password"
          onClick={(ev) => {
            ev.preventDefault();
            setIsForgotPassword(true);
          }}
        >
          Forgot password?
        </a>
      )}

      {isSignup && (
        <div className="input-group password-input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
          <img
            src={eyeIcon}
            alt="Show/Hide Password"
            className="toggle-password-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          <button
            className="social-button facebook-login"
            onClick={handleFacebookLogin}
          >
            <img src={facebookIcon} alt="Facebook" />
          </button>
        </div>
      )}

      {/* {!isForgotPassword && (
        <p className="register-login-link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Log in" : "Have no account yet? Register"}
        </p>
      )} */}

      {!isForgotPassword && !isSignup && (
        <div className="signup-container">
          <p className="signup-text" onClick={() => setIsSignup(true)}>
            Don't have an account yet?
          </p>
          <button className="signup-button" onClick={() => setIsSignup(true)}>
            Register
          </button>
        </div>
      )}
    </form>
  );
}
