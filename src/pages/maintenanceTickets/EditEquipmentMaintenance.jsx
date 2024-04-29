import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { EquipmentMaintenanceForm } from "../../components/forms/EquipmentMaintenanceForm"
import {
  getMaintenanceTickets,
  updateTicket,
} from "../../data/equipmentmaintenance"

export const EditEquipmentMaintenance = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const formEl = useRef()

  const [ticket, setTicket] = useState({})

  useEffect(() => {
    if (id) {
      getMaintenanceTickets(parseInt(id)).then((ticketData) => {
        if (ticketData) {
          setTicket(ticketData)
        }
      })
    }
  }, [id])

  useEffect(() => {
    if (ticket.id) {
      const { dateNeeded, dateScheduled } = formEl.current
      dateNeeded.value = ticket.date_needed
      dateScheduled.value = ticket.date_scheduled
    }
  }, [ticket])

  const StaticJSX = () => {
    if (ticket.id) {
      return (
        <>
          <div>
            <div>Equipment</div>
            <div>{ticket.equipment.name}</div>
          </div>
          <div>
            <div>Maintenance Type</div>
            <div>{ticket.maintenance.name}</div>
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
    navigate(`/maintenance/${id}`)
  }

  return (
    <EquipmentMaintenanceForm
      formEl={formEl}
      staticJSX={<StaticJSX />}
      submitFunction={saveTicket}
      title="Edit Equipment Maintenance"
    />
  )
}
