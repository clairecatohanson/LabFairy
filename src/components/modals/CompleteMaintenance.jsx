import { ModalLayout } from "../layouts/ModalLayout"
import { Input } from "../form-elements/Input"
import { useRef } from "react"
import { createTicket, updateTicket } from "../../data/equipmentmaintenance"

export const CompleteMaintenance = ({
  setShowModal,
  showModal,
  ticketId,
  title,
}) => {
  const dateEl = useRef()

  const completeAndScheduleMaintenance = async () => {
    const updatedTicket = {}
    updatedTicket[`date_${title.toLowerCase()}d`] = dateEl.current.value

    const ticketResponse = await updateTicket(ticketId, updatedTicket)
    const dateScheduled = ticketResponse.date_scheduled
    if (!dateScheduled) {
      await updateTicket(ticketId, { date_scheduled: dateEl.current.value })
    }

    const interval = ticketResponse.maintenance.days_interval
    if (title === "Complete" && interval) {
      const completedDateString = dateEl.current.value + "T00:00:00Z"
      const completedDate = new Date(completedDateString)
      completedDate.setDate(completedDate.getDate() + interval)
      const nextDateNeeded = completedDate.toISOString().slice(0, 10)

      const newTicket = {
        equipment_id: ticketResponse.equipment.id,
        maintenance_id: ticketResponse.maintenance.id,
        date_needed: nextDateNeeded,
      }
      await createTicket(newTicket)
    }
    setShowModal(false)
  }

  if (!showModal) {
    return <></>
  }

  return (
    <ModalLayout>
      <div>
        <h3 className="font-bold text-center mb-4">
          Date Maintenance {title}d:
        </h3>
        <div className="centered mb-10">
          <Input id="date" refEl={dateEl} type="date" width="w-48" />
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="btn" onClick={completeAndScheduleMaintenance}>
          {title} Maintenance
        </button>
        <button
          className="btn"
          onClick={() => {
            setShowModal(false)
          }}
        >
          Cancel
        </button>
      </div>
    </ModalLayout>
  )
}
