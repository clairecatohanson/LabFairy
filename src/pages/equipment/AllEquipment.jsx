import { useContext, useEffect, useState } from "react"
import { getEquipment } from "../../data/equipment"
import { EquipmentCard } from "../../components/cards/EquipmentCard"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppWrapper"
import "./allEquipment.css"

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
    <div>
      <header>
        <h2>All Lab Equipment</h2>
        <div className="page-actions">
          <div className="filter-bar">Filter Bar (Stretch Goal)</div>
          {user.admin && (
            <button
              className="btn"
              onClick={() => {
                navigate("/new-equipment")
              }}
            >
              Add New Equipment
            </button>
          )}
        </div>
      </header>
      <section className="equipment-cards-container">
        <div className="equipment-cards">
          {allEquipment.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              userHasAccess={equipment.has_access}
            ></EquipmentCard>
          ))}
        </div>
      </section>
    </div>
  )
}
