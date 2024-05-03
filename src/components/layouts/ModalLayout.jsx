// import "./modal.css"

export const ModalLayout = ({ children, title }) => {
  const [content, actions] = children

  return (
    <div className="modal-overlay">
      <header className="text-center text-lg text-purple-700 font-serif mb-4">
        {title}
      </header>
      <section className="centered">{content}</section>
      <div className="centered">{actions}</div>
    </div>
  )
}
