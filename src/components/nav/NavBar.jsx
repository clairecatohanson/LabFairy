import { NavLink, useNavigate } from "react-router-dom"

export const NavBar = () => {
  const navigate = useNavigate()
  return (
    <ul>
      <li>Equipment</li>
      <li>Maintenance</li>
    </ul>
  )
}
