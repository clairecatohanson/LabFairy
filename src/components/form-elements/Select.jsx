// import "./elements.css"

export const Select = ({ id, defaultOption, dropdownOptions, width }) => {
  return (
    <fieldset htmlFor={id}>
      <select className={`form-select-element ${width}`} id={id}>
        <option value="0">{defaultOption}</option>
        {dropdownOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </fieldset>
  )
}
