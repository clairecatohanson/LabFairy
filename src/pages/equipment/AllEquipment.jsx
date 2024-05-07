import { useContext, useEffect, useState } from "react"
import { getEquipment } from "../../data/equipment"
import { EquipmentCard } from "../../components/cards/EquipmentCard"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppWrapper"
import { EquipmentRequestModal } from "../../components/modals/EquipmentRequestModal"

export const AllEquipment = () => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const [allEquipment, setAllEquipment] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [equipment, setEquipment] = useState(0)

  useEffect(() => {
    if (!showModal) {
      getEquipment().then((equipmentData) => {
        if (equipmentData) {
          setAllEquipment(equipmentData)
        }
      })
    }
  }, [showModal])

  return (
    <div className="page-container">
      <EquipmentRequestModal
        equipment={equipment}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <header className="page-header">
        <h2 className="page-heading mb-12">All Lab Equipment</h2>
        <div className="page-header-actions">
          <div className="min-w-[28rem] bg-pink-100 rounded-lg">
            Filter Bar (Stretch Goal)
          </div>
          {user.admin && (
            <button
              className="btn bg-pink-100"
              onClick={() => {
                navigate("/new-equipment")
              }}
            >
              Add New Equipment
            </button>
          )}
        </div>
      </header>
      <section className="equipment-cards flex flex-wrap justify-center">
        {allEquipment.map((equipment) => (
          <EquipmentCard
            key={equipment.id}
            equipment={equipment}
            setEquipment={setEquipment}
            setShowModal={setShowModal}
            userHasAccess={equipment.has_access}
            userRequestedAccess={equipment.requested_access}
          ></EquipmentCard>
        ))}
      </section>
    </div>
  )
}
