import "./modal.css"

export const ModalLayout = ({ children, title }) => {
  const [content, actions] = children

  return (
    <div className="modal-overlay">
      <header>{title}</header>
      <section>{content}</section>
      <div>{actions}</div>
    </div>
  )
}
