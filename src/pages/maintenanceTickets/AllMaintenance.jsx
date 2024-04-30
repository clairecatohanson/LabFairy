import { useContext } from "react"
import { AppContext } from "../../context/AppWrapper"
import { useNavigate } from "react-router-dom"

export const AllMaintenance = () => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={() => {
          navigate("/new-maintenance")
        }}
      >
        {user.admin ? "Schedule Maintenance" : "Request Maintenance"}
      </button>
    </div>
  )
}
