export const CardLayout = ({ children, tag, title }) => {
  const [content, actions] = children
  return (
    <div>
      <header>{title}</header>
      <div>{content}</div>
      <div>{tag}</div>
      <div>{actions}</div>
    </div>
  )
}
