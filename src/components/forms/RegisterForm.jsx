import { useNavigate } from "react-router-dom"
import { FormLayout } from "../layouts/FormLayout"
import { Input } from "../form-elements/Input"

export const RegisterForm = ({
  addedClasses = undefined,
  formEl,
  submitFunction,
  title,
}) => {
  const navigate = useNavigate()

  return (
    <FormLayout addedClasses={addedClasses} title={title}>
      <form className="form" ref={formEl}>
        <Input
          addedClasses="text-center"
          id="firstName"
          label="First Name"
          type="text"
          width="w-96"
        />
        <Input
          addedClasses="text-center"
          id="lastName"
          label="Last Name"
          type="text"
          width="w-96"
        />
        <Input
          addedClasses="text-center"
          id="email"
          label="Email"
          type="email"
          width="w-96"
        />
        <Input
          addedClasses="text-center"
          id="username"
          label="Username"
          type="text"
          width="w-96"
        />
        <Input
          addedClasses="text-center"
          id="password"
          label="Password"
          type="password"
          width="w-96"
        />
      </form>
      <div className="form-actions">
        <button
          className="btn bg-bluegreen-500 text-gray-100 border-2 border-bluegreen-700"
          onClick={submitFunction}
        >
          Register
        </button>
        <button
          className="btn bg-bluegreen-500 text-gray-100 border-2 border-bluegreen-700"
          onClick={() => {
            navigate("/login")
          }}
        >
          Back to Login
        </button>
      </div>
    </FormLayout>
  )
}
