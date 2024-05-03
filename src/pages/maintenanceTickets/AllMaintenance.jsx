import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppWrapper"
import { useNavigate } from "react-router-dom"
import { getMaintenanceTickets } from "../../data/equipmentmaintenance"
import { MaintenanceCard } from "../../components/cards/MaintenanceCard"

export const AllMaintenance = () => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  const [maintenanceTickets, setMaintenanceTickets] = useState([])

  useEffect(() => {
    getMaintenanceTickets().then((ticketData) => {
      if (ticketData) {
        setMaintenanceTickets(ticketData)
      }
    })
  }, [])

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="page-heading mb-12">Maintenance Tickets</h2>
        <div className="page-header-actions">
          <div className="min-w-[28rem] bg-pink-100 rounded-lg">
            Filter Bar (Stretch Goal)
          </div>
          <button
            className="btn bg-pink-100"
            onClick={() => {
              navigate("/new-maintenance")
            }}
          >
            {user.admin ? "Schedule Maintenance" : "Request Maintenance"}
          </button>
        </div>
      </header>
      <section className="maintenance-cards max-w-4xl mx-auto space-y-4">
        {maintenanceTickets.map((ticket) => (
          <MaintenanceCard key={`ticket=${ticket.id}`} ticket={ticket} />
        ))}
      </section>
    </div>
  )
}
