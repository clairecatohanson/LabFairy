import "./elements.css"

export const Textarea = ({ id, label, placeholder }) => {
  return (
    <fieldset className="form-fieldset">
      {label && <label className="element-label">{label}</label>}
      <textarea
        id={id}
        placeholder={placeholder}
        className="form-textarea"
      ></textarea>
    </fieldset>
  )
}
