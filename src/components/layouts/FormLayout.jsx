export const FormLayout = ({ addedClasses = undefined, title, children }) => {
  const [formContent, primaryActions, additionalActions] = children

  return (
    // Page Container
    <div className="page-container">
      <header className={`page-header ${addedClasses}`}>
        <h2 className="page-heading text-center">{title}</h2>
      </header>
      {/* Form & Form Actions */}
      <main className="form-container">
        {/* Form Container */}
        <>{formContent}</>
        {/* Actions Container */}
        <div className="centered">{primaryActions}</div>
        {additionalActions && (
          <div className="centered mt-4">{additionalActions}</div>
        )}
      </main>
    </div>
  )
}
