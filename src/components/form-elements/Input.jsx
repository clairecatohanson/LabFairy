export const Input = ({
  addedClasses,
  checkboxes = undefined,
  heading = undefined,
  id,
  label = undefined,
  name = undefined,
  placeholder = "",
  refEl = undefined,
  type,
  width = undefined,
}) => {
  return (
    <fieldset>
      {label && (
        <label className="form-element-label" htmlFor={id}>
          {label}
        </label>
      )}
      {checkboxes ? (
        <div className={`form-element ${width}`}>
          <h3 className="centered font-bold text-xl text-pink-600 mb-4">
            {heading}
          </h3>
          {checkboxes.map((checkbox) => (
            <div className="w-64 mx-auto" key={checkbox.id}>
              <div className="form-checkbox-container">
                <label htmlFor={checkbox.id}>{checkbox.name}</label>
                <input
                  id={checkbox.id}
                  name={name}
                  ref={refEl}
                  type="checkbox"
                  className="form-checkbox"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <input
            id={id}
            className={`form-element ${width} ${addedClasses}`}
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
