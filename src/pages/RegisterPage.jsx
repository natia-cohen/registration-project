import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { login, signup } from "../store/actions/user.actions"
import { userService } from "../services/user"
import { loginWithFacebook } from "../services/facebookService"
import { toast } from "react-toastify"

import { RegisterLogo } from "../cmps/RegisterLogo"
import { RegisterIntro } from "../cmps/RegisterIntro"
import { RegisterIllustration } from "../cmps/RegisterIllustration"
import { RegisterForm } from "../cmps/RegisterForm"

import "../assets/styles/RegisterPage.css"
import "react-toastify/dist/ReactToastify.css"

export function RegisterPage() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser());
  const [isSignup, setIsSignup] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userModule.user);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome, ${user.email}! 🎉`)
      navigate("/welcome")
    }
  }, [user, navigate])

  function handleChange(ev) {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    
    try {
      let loggedInUser
      if (isSignup) {
        if (credentials.password !== credentials.confirmPassword) {
          toast.error("Passwords do not match")
          return;
        }
        loggedInUser = await dispatch(signup(credentials));
      } else {
        loggedInUser = await dispatch(login(credentials));
      }

      if (loggedInUser) {
        toast.success(`Welcome, ${loggedInUser.email}! 🎉`);
        navigate("/welcome")
      }

    } catch (err) {
      toast.error("Authentication failed. Please try again.");
    }
  }

  const handleFacebookLogin = async (ev) => {
    ev.preventDefault()

    try {
      const userInfo = await loginWithFacebook()
      console.log("User Info:", userInfo)
      alert(`Hello, ${userInfo.name}`)
      navigate("/welcome")
    } catch (error) {
      console.error("Login failed:", error);
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
            handleFacebookLogin={handleFacebookLogin}
            isSignup={isSignup}
            setIsSignup={setIsSignup}
         
          />
        </div>
      </div>
    </div>
  );
}

