import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function WelcomePage() {
  const user = useSelector((state) => state.userModule.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register")
    }
  }, [user, navigate]);

  if (!user) return null

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>You have successfully logged in.</p>
    </div>
  );
}
