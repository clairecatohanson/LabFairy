import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppWrapper"
import { useNavigate } from "react-router-dom"
import { getMaintenanceTickets } from "../../data/equipmentMaintenance"
import { MaintenanceCard } from "../../components/cards/MaintenanceCard"
import { MaintenanceFilterBar } from "../../components/filterbars/MaintenanceFilterBar"

export const AllMaintenance = () => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  const [maintenanceTickets, setMaintenanceTickets] = useState([])

  useEffect(() => {
    getMaintenanceTickets({ query: "progress=active" }).then((ticketData) => {
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
          <MaintenanceFilterBar setTickets={setMaintenanceTickets} />
          <button
            className="btn bg-pink-100 border-pink-700 shadow-lg"
            onClick={() => {
              navigate("/new-maintenance")
            }}
          >
            {user.admin ? "Schedule Maintenance" : "Request Maintenance"}
          </button>
        </div>
      </header>
      {maintenanceTickets.length ? (
        <section className="maintenance-cards max-w-4xl mx-auto space-y-4">
          {maintenanceTickets.map((ticket) => (
            <MaintenanceCard key={`ticket=${ticket.id}`} ticket={ticket} />
          ))}
        </section>
      ) : (
        <section className="max-w-4xl mx-auto">
          There are currently no pending or scheduled maintenance tickets for
          your equipment.
          <br></br> Use the filter bar to view past maintenance tickets.
        </section>
      )}
    </div>
  )
}
