import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { EquipmentForm } from "../../components/forms/EquipmentForm"
import { createEquipment } from "../../data/equipment"
import { createLabEquipment } from "../../data/labequipment"

export const NewEquipment = () => {
  const formEl = useRef()
  const navigate = useNavigate()

  const addNewEquipment = async () => {
    const { name, location, description } = formEl.current
    const equipment = {
      name: name.value,
      description: description.value,
      location_id: location.value,
    }
    const newEquipment = await createEquipment(equipment)
    return newEquipment
  }

  const provideLabAccess = async (equipmentId) => {
    const { labs } = formEl.current
    const checkedLabIds = []
    labs.forEach((lab) => {
      if (lab.checked) {
        checkedLabIds.push(parseInt(lab.id))
      }
    })
    const labEquipmentPromises = checkedLabIds.map((labId) => {
      const labEquipment = { lab_id: labId, equipment_id: equipmentId }
      return createLabEquipment(labEquipment)
    })
    try {
      await Promise.all(labEquipmentPromises)
    } catch (error) {
      throw Error(error.status)
    }
  }

  const saveEquipment = async () => {
    const newEquipment = await addNewEquipment()
    const newEquipmentId = newEquipment.id
    await provideLabAccess(newEquipmentId)
    navigate("/equipment")
  }

  const cancelClick = () => {
    navigate("/equipment")
  }

  return (
    <EquipmentForm
      formEl={formEl}
      heading="Create New Equipment"
      cancelFunction={cancelClick}
      submitFunction={saveEquipment}
      title="Add New Equipment"
    />
  )
}
