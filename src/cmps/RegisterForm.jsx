
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user"

export function RegisterForm({ user, credentials, handleChange, handleSubmit, isSignup, setIsSignup, handleFacebookLogin }) {
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState("")


  const handleForgotPasswordSubmit = async (ev) => {
    ev.preventDefault();
    const result = await userService.sendPasswordResetEmail(email)
    alert(result.message)
  }


  return (
    <form className="register-form" onSubmit={isForgotPassword ? handleForgotPasswordSubmit : handleSubmit}>
      <h2 className="form-title">
        {isForgotPassword ? "Reset Password" : isSignup ? "Sign Up" : "Log In"}
      </h2>

      {isForgotPassword ? (
        <>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="register-button">
            Send Reset Link
          </button>
          <p className="register-login-link" onClick={() => setIsForgotPassword(false)}>
            Back to Login
          </p>
        </>
      ) : (
        <>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          {!isSignup && (
            <a href="#" className="forgot-password" onClick={(e) => {
              e.preventDefault();
              setIsForgotPassword(true);
            }}>
              Forgot password?
            </a>
          )}

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={credentials.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" className="register-button">
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <p className="register-login-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Already have an account? Log in" : "Have no account yet? Register"}
          </p>
        </>
      )}
    </form>
  )
}




