import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userService } from "../services/user";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  console.log("Token from URL:", token)


  const handleResetPassword = async (ev) => {
    
    console.log(password, confirmPassword);

    ev.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return
    }
    console.log("Sending reset password request:", { token, password });


    try {
      const result = await userService.resetPassword(token, password);
      alert(result.message)
      navigate("/register")
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  }

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
