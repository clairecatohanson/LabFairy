import { ModalLayout } from "../layouts/ModalLayout"
import { Input } from "../form-elements/Input"
import { useRef } from "react"
import { updateTicket } from "../../data/equipmentmaintenance"

export const CompleteMaintenance = ({ setShowModal, ticketId, title }) => {
  const dateEl = useRef()

  const completeMaintenance = async () => {
    const updatedTicket = {}
    updatedTicket[`date_${title.toLowerCase()}d`] = dateEl.current.value

    await updateTicket(ticketId, updatedTicket)

    setShowModal(false)
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
        <button className="btn" onClick={completeMaintenance}>
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
