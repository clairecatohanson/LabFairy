import "./form.css"

export const FormLayout = ({ title, children }) => {
  const [formContent, actions] = children

  return (
    <div className="global-container">
      <header>
        <h3>{title}</h3>
      </header>
      <section>
        <div className="form-container">{formContent}</div>
        <div className="actions-container">{actions}</div>
      </section>
    </div>
  )
}
