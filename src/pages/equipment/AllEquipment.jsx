import { useContext, useEffect, useState } from "react"
import { getEquipment } from "../../data/equipment"
import { EquipmentCard } from "../../components/cards/EquipmentCard"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppWrapper"
// import "./allEquipment.css"

export const AllEquipment = () => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const [allEquipment, setAllEquipment] = useState([])

  useEffect(() => {
    getEquipment().then((equipmentData) => {
      if (equipmentData) {
        setAllEquipment(equipmentData)
      }
    })
  }, [])

  return (
    <div className="page-container">
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
            userHasAccess={equipment.has_access}
          ></EquipmentCard>
        ))}
      </section>
    </div>
  )
}
