import { ModalLayout } from "../layouts/ModalLayout"

export const DeleteEquipmentModal = ({
  equipment,
  destroyEquipment,
  showModal,
  setShowModal,
}) => {
  if (!showModal) {
    return <></>
  }

  return (
    <ModalLayout title={"Confirm Equipment Destruction"}>
      <div className="flex flex-col space-y-2 mb-6">
        <p>Are you sure you want to destroy {equipment.name}?</p>
        <p>
          Destroying equipment will permanently remove the equipment and all of
          its associated maintenance tickets.
        </p>
        <p>
          If you would like to remove equipment from the All Equipment page but
          still maintain access to data about equipment and its maintenance
          tickets, click No below and choose Archive instead.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <button className="btn" onClick={destroyEquipment}>
          Yes, permanently delete equipment and remove its data
        </button>
        <button
          className="btn"
          onClick={() => {
            setShowModal(false)
          }}
        >
          No, keep equipment and its data
        </button>
      </div>
    </ModalLayout>
  )
}
