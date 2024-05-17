import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { EquipmentMaintenanceForm } from "../../components/forms/EquipmentMaintenanceForm"
import {
  deleteMaintenance,
  getMaintenanceTickets,
  updateTicket,
} from "../../data/equipmentMaintenance"
import { CompleteMaintenance } from "../../components/modals/CompleteMaintenance"

export const EditEquipmentMaintenance = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const formEl = useRef()

  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [ticket, setTicket] = useState({})

  useEffect(() => {
    if (id && showCompleteModal == false) {
      getMaintenanceTickets({ ticketId: parseInt(id) }).then((ticketData) => {
        if (ticketData) {
          setTicket(ticketData)
        }
      })
    }
  }, [id, showCompleteModal])

  useEffect(() => {
    if (ticket.id) {
      const { dateNeeded, dateScheduled } = formEl.current
      dateNeeded.value = ticket.date_needed
      dateScheduled.value = ticket.date_scheduled
    }

    if (ticket.date_completed) {
      navigate("/maintenance")
    }
  }, [ticket])

  const StaticJSX = () => {
    if (ticket.id) {
      return (
        <>
          <div>
            <div className="form-element-label">Equipment</div>
            <div className="form-element-locked w-96 centered">
              {ticket.equipment.name}
            </div>
          </div>
          <div>
            <div className="form-element-label">Maintenance Type</div>
            <div className="form-element-locked w-96 centered">
              {ticket.maintenance.name}
            </div>
          </div>
        </>
      )
    }
  }

  const saveTicket = async () => {
    const { dateNeeded, dateScheduled } = formEl.current
    const editedTicket = {
      date_needed: dateNeeded.value,
      date_scheduled: dateScheduled.value,
    }

    await updateTicket(parseInt(id), editedTicket)
    navigate("/maintenance")
  }

  const cancelMaintenance = async () => {
    const editedTicket = { cancelled: true }
    await updateTicket(parseInt(id), editedTicket)
    navigate("/maintenance")
  }

  const deleteTicket = async () => {
    await deleteMaintenance(parseInt(id))
    navigate("/maintenance")
  }

  return (
    <>
      <CompleteMaintenance
        setShowModal={setShowCompleteModal}
        showModal={showCompleteModal}
        ticketId={ticket.id}
        title="Complete"
      />
      <EquipmentMaintenanceForm
        deleteFunction={deleteTicket}
        formEl={formEl}
        heading="Edit Maintenance Ticket"
        id={id}
        setShowModal={setShowCompleteModal}
        staticJSX={<StaticJSX />}
        submitFunction={saveTicket}
        title="Edit Equipment Maintenance"
        updateFunction={cancelMaintenance}
      />
    </>
  )
}
