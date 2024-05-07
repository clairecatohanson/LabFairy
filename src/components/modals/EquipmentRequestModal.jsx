import { useRef } from "react"
import { Input } from "../form-elements/Input"
import { ModalLayout } from "../layouts/ModalLayout"
import { createAccessRequest } from "../../data/equipmentrequest"

export const EquipmentRequestModal = ({
  equipment,
  showModal,
  setShowModal,
}) => {
  const dateEl = useRef()

  const submitRequest = async () => {
    const equipmentRequest = {
      equipment_id: equipment.id,
      training_date: dateEl.current.value,
    }

    await createAccessRequest(equipmentRequest)

    setShowModal(false)
  }

  if (!showModal) {
    return <></>
  }

  return (
    <ModalLayout>
      <div>
        <h2 className="modal-heading">Request Access to {equipment.name}</h2>
        <h3 className="font-bold text-center mb-4">Date Trained:</h3>
        <div className="centered mb-10">
          <Input id="date" refEl={dateEl} type="date" width="w-48" />
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="btn" onClick={submitRequest}>
          Submit Request
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
