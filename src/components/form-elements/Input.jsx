import "./elements.css"

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
    <fieldset className="form-fieldset">
      {label && (
        <label htmlFor={id} className="element-label">
          {label}
        </label>
      )}
      {checkboxes ? (
        <div className="checkbox-items">
          {checkboxes.map((checkbox) => (
            <div className="checkbox-item" key={checkbox.id}>
              <label htmlFor={checkbox.id}>{checkbox.name}</label>
              <div className="checkbox">
                <input
                  id={checkbox.id}
                  name={name}
                  ref={refEl}
                  type="checkbox"
                  className="checkbox-input"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="input-container">
          <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            ref={refEl}
          />
        </div>
      )}
    </fieldset>
  )
}
