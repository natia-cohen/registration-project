export function RegisterForm({ user, credentials, handleChange, onSignup }) {
  return (
    <form className="register-form" onSubmit={onSignup}>
      {user && <p>Welcome, {user.username}!</p>}
  
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

      <button
        type="button"
        className="forgot-password"
        // onClick={() => navigate("/forgot-password")}
      >
        Forgot password?
      </button>

      <button type="submit" className="register-button">
        Signup
      </button>

      <div className="register-social-buttons">
        <button className="register-social-btn">Google</button>
        <button className="register-social-btn">Facebook</button>
      </div>

      <p className="register-login-link">
        Have an account? <a href="/login">Log in</a>
      </p>
    </form>
  );
}
