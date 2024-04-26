export const Textarea = ({ id, label, placeholder }) => {
  return (
    <fieldset>
      {label && <label>{label}</label>}
      <textarea id={id} placeholder={placeholder}></textarea>
    </fieldset>
  )
}
