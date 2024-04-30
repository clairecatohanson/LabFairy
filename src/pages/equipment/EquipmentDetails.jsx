import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  deleteEquipment,
  getEquipment,
  updateEquipment,
} from "../../data/equipment"
import { getMaintenanceTickets } from "../../data/equipmentmaintenance"
import { AppContext } from "../../context/AppWrapper"
import { DeleteEquipmentModal } from "../../components/modals/DeleteEquipmentModal"
import "./equipmentDetails.css"

export const EquipmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AppContext)

  const [equipment, setEquipment] = useState({})
  const [archived, setArchived] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([])
  const [completedMaintenance, setCompletedMaintenance] = useState([])

  useEffect(() => {
    if (id) {
      getEquipment({ equipment_id: parseInt(id) }).then((equipmentData) => {
        if (equipmentData) {
          setEquipment(equipmentData)
        }
      })

      getMaintenanceTickets({
        query: `equipment_id=${parseInt(id)}&progress=scheduled&limit=3`,
      }).then((ticketData) => {
        if (ticketData) {
          setUpcomingMaintenance(ticketData)
        }
      })

      getMaintenanceTickets({
        query: `equipment_id=${parseInt(id)}&progress=completed&limit=3`,
      }).then((ticketData) => {
        if (ticketData) {
          setCompletedMaintenance(ticketData)
        }
      })
    }
  }, [id])

  useEffect(() => {
    if (equipment.id) {
      setArchived(equipment.archived)
    }
  }, [equipment])

  const editArchived = async () => {
    const equipmentId = parseInt(id)
    const updatedEquipment = {
      archived: !archived,
    }
    await updateEquipment(equipmentId, updatedEquipment)
    setArchived(!archived)
  }

  const destroyClick = () => {
    setShowModal(true)
  }

  const destroyEquipment = async () => {
    await deleteEquipment(parseInt(id))
    navigate("/equipment")
  }

  return (
    <div>
      <DeleteEquipmentModal
        equipment={equipment}
        destroyEquipment={destroyEquipment}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <header>{equipment.name}</header>
      <div className="section-container">
        <div className="sections">
          <section className="page-section shared-by">
            <h3>Equipment Shared By</h3>
            <ul>
              {equipment.equipment_labs?.map((equipmentLab) => (
                <li key={`lab-${equipmentLab.lab.id}`}>
                  {equipmentLab.lab.name}
                </li>
              ))}
            </ul>
          </section>
          <section className="page-section details">
            <h3>Equipment Details</h3>
            <div className="details-container">
              <div className="location-description">
                <div className="location">
                  <h4>Location</h4>
                  <div>
                    {equipment.location?.room.building.short_name}{" "}
                    {equipment.location?.room.name}
                  </div>
                  <div>{equipment.location?.name}</div>
                </div>
                <div className="description">
                  <h4>Description</h4>
                  <div>{equipment.description}</div>
                </div>
              </div>
              <div>
                <div className="tag">
                  {archived ? <div>Archived</div> : <div>Active</div>}
                </div>
              </div>
            </div>
          </section>
          <section className="page-section maintenance">
            <div>
              <h3>Upcoming Maintenance</h3>
              {upcomingMaintenance.map((ticket) => (
                <div key={`ticket-${ticket.id}`}>
                  <h4>{ticket.maintenance.name}</h4>
                  <div>
                    Date Needed: {ticket.date_needed} (Requested by{" "}
                    {ticket.user.first_name} {ticket.user.last_name})
                  </div>
                  <div>Date Scheduled: {ticket.date_scheduled}</div>
                  <div>
                    Suggested Maintenance Interval:{" "}
                    {ticket.maintenance.days_interval ? (
                      <div>{ticket.maintenance.days_interval} Days</div>
                    ) : (
                      <div>One-time maintenance</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3>Last Completed Maintenance</h3>
              {completedMaintenance.map((ticket) => (
                <div key={`ticket-${ticket.id}`}>
                  <h4>{ticket.maintenance.name}</h4>
                  <div>
                    Date Needed: {ticket.date_needed} (Requested by{" "}
                    {ticket.user.first_name} {ticket.user.last_name})
                  </div>
                  <div>Date Scheduled: {ticket.date_scheduled}</div>
                  <div>Date Completed: {ticket.date_completed}</div>
                  <div>
                    Suggested Maintenance Interval:{" "}
                    {ticket.maintenance.days_interval ? (
                      <div>{ticket.maintenance.days_interval} Days</div>
                    ) : (
                      <div>One-time maintenance</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="all-btns-container">
        <div className="edit-btns">
          <button
            className="btn"
            onClick={() => {
              navigate("/new-maintenance")
            }}
          >
            {user.admin ? "Schedule" : "Request"} Maintenance
          </button>
          {user.admin && (
            <button
              className="btn"
              onClick={() => {
                navigate("edit")
              }}
            >
              Edit Equipment Details
            </button>
          )}
        </div>
        {user.admin && (
          <div className="remove-btns">
            {archived ? (
              <button className="btn" onClick={editArchived}>
                Restore
              </button>
            ) : (
              <button className="btn" onClick={editArchived}>
                Archive
              </button>
            )}
            <button className="btn" onClick={destroyClick}>
              Destroy
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
