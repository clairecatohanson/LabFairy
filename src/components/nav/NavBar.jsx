import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../context/AppWrapper"
import logo from "../../assets/lab_fairy_logo.png"

export const NavBar = () => {
  const { user } = useContext(AppContext)

  return (
    // Navbar Container
    <div className="flex space-between h-26">
      <Link to="/">
        <div className="bg-white h-24 ml-8">
          <img className="h-32" src={logo} alt="logo" />
        </div>
      </Link>
      <nav className="w-2/3 ml-auto pr-5 bg-white text-purple-900 flex justify-end space-x-5 items-center">
        <Link to="/">
          <div className="nav-link">Home</div>
        </Link>
        <Link to="/equipment">
          <div className="nav-link">Equipment</div>
        </Link>
        <Link to="/maintenance">
          <div className="nav-link">Maintenance</div>
        </Link>
        <Link to="/inventories">
          <div className="nav-link">Inventories</div>
        </Link>
        <Link to="/supplyrequests">
          <div className="nav-link">Supplies</div>
        </Link>
        {user.admin && (
          <Link to="/orders">
            <div className="nav-link">Orders</div>
          </Link>
        )}
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem("fairy_auth")
          }}
        >
          <div className="nav-link hover:border-pink-900">Logout</div>
        </Link>
      </nav>
    </div>
  )
}
