import {
  deleteEquipmentRequest,
  updateEquipmentRequest,
} from "../../data/equipmentrequest"
import { ModalLayout } from "../layouts/ModalLayout"

export const ApproveAccessModal = ({ requestId, setShowModal, showModal }) => {
  const approveRequest = async () => {
    const adminApproval = {
      approved: true,
    }

    await updateEquipmentRequest(requestId, adminApproval)
    setShowModal(false)
  }

  const denyRequest = async () => {
    await deleteEquipmentRequest(requestId)
    setShowModal(false)
  }

  if (!showModal) {
    return <></>
  }

  return (
    <ModalLayout>
      <div>
        <h2 className="modal-heading">Approve Equipment Access Request?</h2>
      </div>
      <div className="flex space-x-4">
        <button className="btn" onClick={approveRequest}>
          Approve
        </button>
        <button className="btn" onClick={denyRequest}>
          Deny
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
