import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "../components/forms/LoginForm"
import { login } from "../data/authentication"
import logo from "../assets/lab_fairy_logo.png"

export const Login = () => {
  const formEl = useRef("")
  const navigate = useNavigate()

  const submit = async () => {
    const { username, password } = formEl.current
    const userCredentials = {
      username: username.value,
      password: password.value,
    }

    const response = await login(userCredentials)
    if (response.valid) {
      localStorage.setItem("fairy_auth", JSON.stringify(response))
      navigate("/")
    }
  }

  return (
    <div>
      <div className="bg-pink-100 pt-4">
        <h1 className="text-center text-[3rem] font-serif">Welcome to</h1>
        <img className="w-[38rem] mx-auto" src={logo} alt="Lab fairy logo" />
      </div>
      <LoginForm
        addedClasses="hidden"
        formEl={formEl}
        submitFunction={submit}
      />
    </div>
  )
}
