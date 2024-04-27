import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <ul>
      <li>Equipment</li>
      <li>Maintenance</li>
      <li>
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem("fairy_auth")
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  )
}
