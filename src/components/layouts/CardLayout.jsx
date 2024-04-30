import "./card.css"

export const CardLayout = ({ children, tag, title }) => {
  const [content, actions] = children
  return (
    <div className="card">
      <header className="card-header">{title}</header>
      <div className="content-and-actions">
        <div className="card-content">{content}</div>
        <div className="card-actions">
          <div className="card-tag">{tag}</div>
          <div className="card-buttons">{actions}</div>
        </div>
      </div>
    </div>
  )
}