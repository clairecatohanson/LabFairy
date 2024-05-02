import { Input } from "../form-elements/Input"
import { FormLayout } from "../layouts/FormLayout"

export const LoginForm = ({ formEl, submitFunction, title }) => {
  return (
    <FormLayout title={title}>
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
          type="password"
          width="w-96"
        />
      </form>
      <div className="form-actions">
        <button className="btn" onClick={submitFunction}>
          Login
        </button>
        <button className="btn">Register</button>
      </div>
    </FormLayout>
  )
}
