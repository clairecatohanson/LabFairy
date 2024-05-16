import { useRef } from "react"
import { RegisterForm } from "../components/forms/RegisterForm"
import logo from "../assets/lab_fairy_logo.png"
import { login, register } from "../data/authentication"
import { useNavigate } from "react-router-dom"

export const Register = () => {
  const formEl = useRef()
  const navigate = useNavigate()

  const submit = async () => {
    const { firstName, lastName, email, username, password } = formEl.current
    const newUser = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      username: username.value,
      password: password.value,
    }

    const registerResponse = await register(newUser)
    if (registerResponse.valid) {
      const loginResponse = await login({
        username: username.value,
        password: password.value,
      })
      if (loginResponse.valid) {
        localStorage.setItem("fairy_auth", JSON.stringify(loginResponse))
        navigate(`/register-to-lab/${registerResponse.researcher_id}`)
      }
    }
  }

  return (
    <div>
      <div className="bg-pink-100 pt-4">
        <h1 className="text-center text-[3rem] font-serif">Welcome to</h1>
        <img className="w-[38rem] mx-auto" src={logo} alt="Lab fairy logo" />
      </div>
      <RegisterForm
        addedClasses="hidden"
        formEl={formEl}
        submitFunction={submit}
      />
    </div>
  )
}
