import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../store/actions/user.actions"
import { userService } from "../services/user"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Logo } from "../cmps/Logo";
import { RegisterIntro } from "../cmps/RegisterIntro"
import { RegisterIllustration } from "../cmps/RegisterIllustration"
import { RegisterForm } from "../cmps/RegisterForm"

import "../assets/styles/RegisterPage.css"

export function RegisterPage() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userModule.user);

  useEffect(() => {
    navigate("/register");
  }, [navigate])

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  async function onSignup(ev) {
    ev.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.fullname) return;

    try {
      await dispatch(signup(credentials));
      toast.success(`Welcome, ${credentials.fullname}! 🎉`);
      navigate("/");
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-left">
          <Logo />
          <RegisterIntro />
          <RegisterIllustration />
        </div>
        <div className="register-right">
          <RegisterForm
            user={user}
            credentials={credentials}
            handleChange={handleChange}
            onSignup={onSignup}
          />
        </div>
      </div>
    </div>
  );
}



// import { useState,useEffect } from "react"
// import { useNavigate } from "react-router"
// import { useDispatch, useSelector } from "react-redux"
// import { signup } from "../store/actions/user.actions"
// import { userService } from "../services/user"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "../assets/styles/RegisterPage.css";


// export function RegisterPage() {
//   const [credentials, setCredentials] = useState(userService.getEmptyUser());
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const user = useSelector((state) => state.userModule.user);

//   useEffect(() => {
//     navigate("/register")
//   }, [navigate])

//   function handleChange(ev) {
//     const field = ev.target.name
//     const value = ev.target.value
//     setCredentials({ ...credentials, [field]: value });
//   }

//   async function onSignup(ev) {
//     ev.preventDefault();
//     if (!credentials.username || !credentials.password || !credentials.fullname) return;

//     try {
//       await dispatch(signup(credentials))
//       toast.success(`Welcome, ${credentials.fullname}! 🎉`)
//       navigate("/")
//     } catch (err) {
//       toast.error("Signup failed. Please try again.")
//     }
//   }

//   return (
//     <div className="register-container">
//     <div className="register-box">
//       <div className="register-left">
//         <h2 className="register-subtitle">Welcome aboard my friend</h2>
//         <p>Just a couple of clicks and we start</p>
//       </div>
      
//       <div className="register-right">
//         <h1 className="register-title">Register</h1>
//         {user && <p>Welcome, {user.username}!</p>}
        
//         <form className="register-form" onSubmit={onSignup}>
//           <input type="text" name="fullname" className="register-input" placeholder="Fullname" value={credentials.fullname} onChange={handleChange} required />
//           <input type="text" name="username" className="register-input" placeholder="Username" value={credentials.username} onChange={handleChange} required />
//           <input type="email" name="email" className="register-input" placeholder=
//           "Email" value={credentials.email} onChange={handleChange} required />
//           <input type="password" name="password" className="register-input" placeholder="Password" value={credentials.password} onChange={handleChange} required />

//           <a href="#" className="forgot-password">Forgot password?</a>
          
//           <button type="submit" className="register-button">Signup</button>

//           <div className="register-social-buttons">
//             <button className="register-social-btn">Google</button>
//             <button className="register-social-btn">Facebook</button>
//           </div>

//           <p className="register-login-link">Have an account? <a href="/login">Log in</a></p>
//         </form>
//       </div>
//     </div>
//   </div>
//   )
// }
