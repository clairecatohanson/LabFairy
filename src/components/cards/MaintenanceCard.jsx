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
      height="min-h-48"
      tag={tag}
      tagColor={tagColor}
      title={`${ticket.equipment.name}: ${ticket.maintenance.name}`}
    >
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-12">
        <div className="space-y-2">
          <div className="italic">
            Requested by: {ticket.user?.first_name} {ticket.user?.last_name}
          </div>
          <div className="frequency">
            Recommended Frequency: {ticket.maintenance?.days_interval} days
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <div className="min-w-32">Date Needed: </div>
            <div className="min-w-24">{ticket.date_needed}</div>
          </div>
          <div className="flex space-x-2">
            <div className="min-w-32">Date Scheduled: </div>
            <div className="min-w-24">
              {ticket.date_scheduled ? ticket.date_scheduled : "Pending"}
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="min-w-32">Date Completed: </div>
            <div className="min-w-24">
              {ticket.date_completed
                ? ticket.date_completed.split("T")[0]
                : "Pending"}
            </div>
          </div>
        </div>
      </div>
      <div className="maintenance-actions">
        {user.admin & !ticket.date_completed ? (
          <button
            className="btn border-pink-500 border-4 shadow bg-gray-200"
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
