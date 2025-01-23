export function RegisterForm({ user, credentials, handleChange, handleSubmit, isSignup, setIsSignup }) {
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {user && <p>Welcome, {user.email}!</p>}

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
        {isSignup ? "Already have an account? Log in" : "New here? Sign up"}
      </p>
    </form>
  )
}



// export function RegisterForm({ user, credentials, handleChange, onSignup }) {
//   return (
//     <form className="register-form" onSubmit={onSignup}>
//       {user && <p>Welcome, {user.username}!</p>}
  
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={credentials.email}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={credentials.password}
//         onChange={handleChange}
//         required
//       />

//       <button
//         type="button"
//         className="forgot-password"
//         // onClick={() => navigate("/forgot-password")}
//       >
//         Forgot password?
//       </button>

//       <button type="submit" className="register-button">
//         Signup
//       </button>

//       <div className="register-social-buttons">
//         <button className="register-social-btn">Google</button>
//         <button className="register-social-btn">Facebook</button>
//       </div>

//       <p className="register-login-link">
//         Have an account? <a href="/login">Log in</a>
//       </p>
//     </form>
//   );
// }
