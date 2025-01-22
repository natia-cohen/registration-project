import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../store/actions/user.actions";
import { userService } from "../services/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RegisterLogo } from "../cmps/RegisterLogo";
import { RegisterIntro } from "../cmps/RegisterIntro";
import { RegisterIllustration } from "../cmps/RegisterIllustration";
import { RegisterForm } from "../cmps/RegisterForm";

import "../assets/styles/RegisterPage.css";

export function RegisterPage() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser());
  const [isSignup, setIsSignup] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userModule.user);

  function handleChange(ev) {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    try {
      let loggedInUser;
      if (isSignup) {
        if (credentials.password !== credentials.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        loggedInUser = await dispatch(signup(credentials));
      } else {
        loggedInUser = await dispatch(login(credentials));
      }

      toast.success(`Welcome, ${loggedInUser.email}! 🎉`);
      navigate("/dashboard")
    } catch (err) {
      toast.error("Authentication failed. Please try again.");
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-left">
          <RegisterLogo />
          <RegisterIllustration />
          <RegisterIntro />
        </div>
        <div className="register-right">
          <RegisterForm
            user={user}
            credentials={credentials}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSignup={isSignup}
            setIsSignup={setIsSignup}
          />
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router"
// import { useDispatch, useSelector } from "react-redux"
// import { signup } from "../store/actions/user.actions"
// import { userService } from "../services/user"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

// import { RegisterLogo } from "../cmps/RegisterLogo";
// import { RegisterIntro } from "../cmps/RegisterIntro"
// import { RegisterIllustration } from "../cmps/RegisterIllustration"
// import { RegisterForm } from "../cmps/RegisterForm"

// import "../assets/styles/RegisterPage.css"

// export function RegisterPage() {
//   const [credentials, setCredentials] = useState(userService.getEmptyUser());
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.userModule.user);

//   useEffect(() => {
//     navigate("/register")
//   }, [navigate])

//   function handleChange(ev) {
//     const field = ev.target.name
//     const value = ev.target.value
//     setCredentials({ ...credentials, [field]: value })
//   }

//   async function onSignup(ev) {
//     ev.preventDefault();
//     if (!credentials.username || !credentials.password || !credentials.fullname) return;

//     try {
//       await dispatch(signup(credentials));
//       toast.success(`Welcome, ${credentials.fullname}! 🎉`);
//       navigate("/");
//     } catch (err) {
//       toast.error("Signup failed. Please try again.");
//     }
//   }

//   return (
//     <div className="register-container">
//       <div className="register-box">
//         <div className="register-left">
//           <RegisterLogo />
//           <RegisterIllustration />
//           <RegisterIntro />
//         </div>
//         <div className="register-right">
//           <RegisterForm
//             user={user}
//             credentials={credentials}
//             handleChange={handleChange}
//             onSignup={onSignup}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


