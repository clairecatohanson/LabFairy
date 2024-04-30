import { useContext, useEffect, useState } from "react"
import { getEquipment } from "../../data/equipment"
import { EquipmentCard } from "../../components/cards/EquipmentCard"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppWrapper"

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
      <h2>All Lab Equipment</h2>
      {user.admin && (
        <button
          onClick={() => {
            navigate("/new-equipment")
          }}
        >
          Add New Equipment
        </button>
      )}
      <div>Filter Bar (Stretch Goal)</div>
      {allEquipment.map((equipment) => (
        <EquipmentCard
          key={equipment.id}
          equipment={equipment}
          userHasAccess={equipment.has_access}
        ></EquipmentCard>
      ))}
    </div>
  )
}
