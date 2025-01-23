export function RegisterForm({ user, credentials, handleChange, handleSubmit, isSignup, setIsSignup }) {
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{isSignup ? "Sign Up" : "Log In"}</h2>
      
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
      
      {!isSignup && <a href="#" className="forgot-password">Forgot password?</a>}
      
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
      
      <div className="social-login">
        <p>Or</p>
        <button className="google-login">Google</button>
        <button className="facebook-login">Facebook</button>
      </div>
      
      <p className="register-login-link" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Log in" : "Have no account yet? Register"}
      </p>
    </form>
  );
}




