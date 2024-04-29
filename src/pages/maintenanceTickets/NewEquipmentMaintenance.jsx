import { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { EquipmentMaintenanceForm } from "../../components/forms/EquipmentMaintenanceForm"
import { AppContext } from "../../context/AppWrapper"
import { createTicket } from "../../data/equipmentMaintenance"

export const NewEquipmentMaintenance = () => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()
  const formEl = useRef()

  const saveTicket = async () => {
    const { equipment, maintenanceType, dateNeeded, notes } = formEl.current
    const newTicket = {
      equipment_id: equipment.value,
      maintenance_id: maintenanceType.value,
      date_needed: dateNeeded.value,
      notes: notes.value,
    }

    if (user.admin) {
      const { dateScheduled } = formEl.current
      newTicket.date_scheduled = dateScheduled.value
    }

    await createTicket(newTicket)
    navigate("/maintenance")
  }

  return (
    <EquipmentMaintenanceForm
      formEl={formEl}
      submitFunction={saveTicket}
      title="Schedule Equipment Maintenance"
    />
  )
}
