export const Input = ({
  id,
  checkboxes = undefined,
  label = undefined,
  name = undefined,
  placeholder = "",
  refEl = undefined,
  type,
}) => {
  return (
    <fieldset>
      {label && <label htmlFor={id}>{label}</label>}
      {checkboxes ? (
        <>
          {checkboxes.map((checkbox) => (
            <div key={checkbox.id}>
              <label htmlFor={checkbox.id}>{checkbox.name}</label>
              <input id={checkbox.id} name={name} ref={refEl} type="checkbox" />
            </div>
          ))}
        </>
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          ref={refEl}
        />
      )}
    </fieldset>
  )
}
