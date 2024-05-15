import { Input } from "../form-elements/Input"
import { FormLayout } from "../layouts/FormLayout"

export const LoginForm = ({
  addedClasses = undefined,
  formEl,
  submitFunction,
  title,
}) => {
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      submitFunction()
    }
  }

  return (
    <FormLayout addedClasses={addedClasses} title={title}>
      <form className="form" ref={formEl}>
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
          onKeyPressFunction={handleEnter}
          type="password"
          width="w-96"
        />
      </form>
      <div className="form-actions">
        <button
          className="btn bg-bluegreen-500 text-gray-100 border-2 border-bluegreen-700"
          onClick={submitFunction}
        >
          Login
        </button>
        <button className="btn bg-gray-100 text-bluegreen-500 border-2 border-bluegreen-700">
          Register
        </button>
      </div>
    </FormLayout>
  )
}
