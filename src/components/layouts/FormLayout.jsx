export const FormLayout = ({ title, children }) => {
  const [formContent, actions] = children

  return (
    <div>
      <header>
        <h3>{title}</h3>
      </header>
      <section>
        {formContent}
        {actions}
      </section>
    </div>
  )
}
