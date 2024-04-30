import { useEffect, useState } from "react"
import { CardLayout } from "../layouts/CardLayout"
import { useNavigate } from "react-router-dom"

export const EquipmentCard = ({ equipment, userHasAccess }) => {
  const navigate = useNavigate()
  const [tag, setTag] = useState("")

  useEffect(() => {
    if (equipment.id) {
      if (equipment.archived) {
        setTag("Archived")
      } else {
        setTag("Active")
      }
    }
  }, [equipment])

  return (
    <CardLayout tag={tag} title={equipment.name}>
      <div>
        <div>
          <p>
            {equipment.location.room.building.short_name}{" "}
            {equipment.location.room.name}
          </p>
          <p>{equipment.location.name}</p>
        </div>
        <div>
          <h4>Shared By:</h4>
          <ul>
            {equipment.equipment_labs.map((equipmentLab) => (
              <li key={`lab-${equipmentLab.lab.id}`}>
                {equipmentLab.lab.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        {userHasAccess && (
          <button
            onClick={() => {
              navigate(`/equipment/${equipment.id}`)
            }}
          >
            Details
          </button>
        )}
      </div>
    </CardLayout>
  )
}
