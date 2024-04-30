import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/equipment">Equipment</Link>
      </li>
      <li>
        <Link to="/maintenance">Maintenance</Link>
      </li>
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
