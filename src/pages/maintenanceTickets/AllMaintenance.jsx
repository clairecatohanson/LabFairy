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
    <div>
      <header>
        <h2>Maintenance Tickets</h2>
        <div className="page-actions">
          <div className="filter-bar">Filter Bar (Stretch Goal)</div>
          <button
            className="btn"
            onClick={() => {
              navigate("/new-maintenance")
            }}
          >
            {user.admin ? "Schedule Maintenance" : "Request Maintenance"}
          </button>
        </div>
      </header>
      <section className="maintenance-cards-container">
        <div className="maintenance-cards">
          {maintenanceTickets.map((ticket) => (
            <MaintenanceCard key={`ticket=${ticket.id}`} ticket={ticket} />
          ))}
        </div>
      </section>
    </div>
  )
}
