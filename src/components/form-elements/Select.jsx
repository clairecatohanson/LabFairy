import "./elements.css"

export const Select = ({ id, defaultOption, dropdownOptions, label }) => {
  return (
    <fieldset htmlFor={id} className="form-fieldset">
      {label && <label className="element-label">{label}</label>}
      <div className="select-container">
        <select id={id}>
          <option value="0">{defaultOption}</option>
          {dropdownOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  )
}
