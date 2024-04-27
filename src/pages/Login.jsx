import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "../components/forms/LoginForm"
import { login } from "../data/authentication"

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

  return <LoginForm formEl={formEl} submitFunction={submit} title="Login" />
}
