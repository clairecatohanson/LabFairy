export const Select = ({ id, defaultOption, dropdownOptions, label }) => {
  return (
    <fieldset>
      {label && <label>{label}</label>}
      <select id={id}>
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
