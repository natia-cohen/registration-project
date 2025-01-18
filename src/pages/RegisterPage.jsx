import { useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../store/actions/user.actions"
import { userService } from "../services/user"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./RegisterPage.css"

export function RegisterPage() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userModule.user);

  function handleChange(ev) {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  }

  async function onSignup(ev) {
    ev.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.fullname) return;

    try {
      await dispatch(signup(credentials))
      toast.success(`Welcome, ${credentials.fullname}! 🎉`)
      navigate("/")
    } catch (err) {
      toast.error("Signup failed. Please try again.")
    }
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      {user && <p>Welcome, {user.username}!</p>}
      <form onSubmit={onSignup}>
        <input type="text" name="fullname" placeholder="Fullname" value={credentials.fullname} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
