// import "./card.css"

export const CardLayout = ({
  children,
  height = undefined,
  tag = undefined,
  tagColor = undefined,
  title,
  width = undefined,
}) => {
  const [content, actions] = children
  return (
    <div className={`card ${height} ${width}`}>
      <header className="card-header">
        <h3>{title}</h3>
      </header>
      <div className="card-content h-5/6">
        <div className="card-details">{content}</div>
        <div className="card-actions">
          {tag && <div className={`card-tag ${tagColor}`}>{tag}</div>}
          <div className="card-buttons">{actions}</div>
        </div>
      </div>
    </div>
  )
}
