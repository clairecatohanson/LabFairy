import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    // Navbar Container
    <nav className="w-1/2 ml-auto pr-5 h-12 bg-white text-purple-900 flex justify-end space-x-5 items-center">
      <div className="nav-link">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-link">
        <Link to="/equipment">Equipment</Link>
      </div>
      <div className="nav-link">
        <Link to="/maintenance">Maintenance</Link>
      </div>
      <div className="nav-link">
        <Link to="/inventories">Inventories</Link>
      </div>
      <div className="nav-link hover:border-pink-900">
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem("fairy_auth")
          }}
        >
          Logout
        </Link>
      </div>
    </nav>
  )
}
