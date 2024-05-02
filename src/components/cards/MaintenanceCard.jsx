import { useContext, useEffect, useState } from "react"
import { CardLayout } from "../layouts/CardLayout"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppWrapper"

export const MaintenanceCard = ({ ticket }) => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)

  const [tag, setTag] = useState("")
  const [tagColor, setTagColor] = useState("")

  useEffect(() => {
    if (ticket.id) {
      if (ticket.date_completed) {
        setTag("Completed")
        setTagColor("bg-bluegreen-300")
      } else if (ticket.date_scheduled) {
        setTag("Scheduled")
        setTagColor("bg-pink-500 text-pink-100")
      } else if (ticket.date_needed) {
        setTag("Requested")
        setTagColor("bg-bluegreen-500 text-gray-100")
      } else {
        setTag("")
      }
    }
  }, [ticket])

  return (
    <CardLayout
      tag={tag}
      tagColor={tagColor}
      title={`${ticket.equipment.name}: ${ticket.maintenance.name}`}
    >
      <>
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
      </>
      <div className="maintenance-actions">
        {user.admin & !ticket.date_completed ? (
          <button
            className="btn border-pink-500 bg-gray-200"
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
