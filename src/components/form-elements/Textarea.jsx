export const Textarea = ({
  id,
  placeholder,
  width = undefined,
  height = undefined,
}) => {
  return (
    <fieldset>
      <textarea
        className={`form-element ${width} ${height}`}
        id={id}
        placeholder={placeholder}
      ></textarea>
    </fieldset>
  )
}
