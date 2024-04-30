import { useContext, useEffect, useState } from "react"
import { CardLayout } from "../layouts/CardLayout"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppWrapper"

export const MaintenanceCard = ({ ticket }) => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)

  const [tag, setTag] = useState("")

  useEffect(() => {
    if (ticket.id) {
      if (ticket.date_completed) {
        setTag("Completed")
      } else if (ticket.date_scheduled) {
        setTag("Scheduled")
      } else if (ticket.date_needed) {
        setTag("Requested")
      } else {
        setTag("")
      }
    }
  }, [ticket])

  return (
    <CardLayout
      tag={tag}
      title={`${ticket.equipment.name}: ${ticket.maintenance.name}`}
    >
      <div className="maintenance-content">
        <div className="ticket-info">
          <div className="requester">
            Requested by: {ticket.user?.first_name} {ticket.user?.last_name}
          </div>
          <div className="frequency">
            Recommended Frequency: {ticket.maintenance?.days_interval} days
          </div>
        </div>
        <div className="dates">
          <div className="dateNeeded">Date Needed: {ticket.date_needed}</div>
          <div className="dateScheduled">
            Date Scheduled:{" "}
            {ticket.date_scheduled ? ticket.date_scheduled : "Pending"}
          </div>
          <div className="dateCompleted">
            Date Completed:{" "}
            {ticket.date_completed ? ticket.date_completed : "Pending"}
          </div>
        </div>
      </div>
      <div className="maintenance-actions">
        {user.admin & !ticket.date_completed ? (
          <button
            className="btn"
            onClick={() => {
              navigate(`/maintenance/${ticket.id}/edit`)
            }}
          >
            Edit
          </button>
        ) : (
          <></>
        )}
      </div>
    </CardLayout>
  )
}
