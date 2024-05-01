import { Input } from "../form-elements/Input"
import { FormLayout } from "../layouts/FormLayout"

export const LoginForm = ({ formEl, submitFunction, title }) => {
  return (
    <FormLayout title={title}>
      <form ref={formEl}>
        <Input id="username" label="Username" type="text" />
        <Input id="password" label="Password" type="password" />
      </form>
      <div>
        <button className="btn" onClick={submitFunction}>
          Login
        </button>
        <button className="btn">Register</button>
      </div>
    </FormLayout>
  )
}
