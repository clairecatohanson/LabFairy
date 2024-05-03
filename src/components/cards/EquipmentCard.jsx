import { useEffect, useState } from "react"
import { CardLayout } from "../layouts/CardLayout"
import { useNavigate } from "react-router-dom"

export const EquipmentCard = ({ equipment, userHasAccess }) => {
  const navigate = useNavigate()
  const [tag, setTag] = useState("")
  const [tagColor, setTagColor] = useState("")

  useEffect(() => {
    if (equipment.id) {
      if (equipment.archived) {
        setTag("Archived")
        setTagColor("bg-purple-400")
      } else {
        setTag("Active")
        setTagColor("bg-bluegreen-500 text-gray-100")
      }
    }
  }, [equipment])

  return (
    <CardLayout
      tag={tag}
      tagColor={tagColor}
      title={equipment.name}
      width="w-80"
      height="h-72"
    >
      <>
        <div className="italic mb-3">
          <div>
            {equipment.location.room.building.short_name}{" "}
            {equipment.location.room.name}
          </div>
          <div>{equipment.location.name}</div>
        </div>
        <div>
          <ul className="list-disc ml-4">
            {equipment.equipment_labs.map((equipmentLab) => (
              <li key={`lab-${equipmentLab.lab.id}`}>
                {equipmentLab.lab.name}
              </li>
            ))}
          </ul>
        </div>
      </>
      <>
        {userHasAccess && (
          <button
            className="btn border-pink-500 bg-gray-200"
            onClick={() => {
              navigate(`/equipment/${equipment.id}`)
            }}
          >
            Details
          </button>
        )}
      </>
    </CardLayout>
  )
}
