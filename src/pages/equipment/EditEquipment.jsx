import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEquipment, updateEquipment } from "../../data/equipment"
import { createLabEquipment, deleteLabEquipment } from "../../data/labequipment"
import { EquipmentForm } from "../../components/forms/EquipmentForm"

export const EditEquipment = () => {
  const formEl = useRef()
  const navigate = useNavigate()
  const { id } = useParams()
  const [equipment, setEquipment] = useState({})
  const [initialLabs, setInitialLabs] = useState([])

  useEffect(() => {
    if (id) {
      getEquipment({ equipment_id: parseInt(id) }).then((equipmentData) => {
        if (equipmentData) {
          setEquipment(equipmentData)
        }
      })
    }
  }, [id])

  useEffect(() => {
    if (equipment.id) {
      const { name, description } = formEl.current
      name.value = equipment.name
      description.value = equipment.description

      const { labs } = formEl.current
      const selectedLabIds = []
      setInitialLabs(selectedLabIds)

      equipment.equipment_labs.forEach((el) => selectedLabIds.push(el.lab.id))
      labs.forEach((lab) => {
        if (selectedLabIds.includes(parseInt(lab.id))) {
          lab.checked = true
        }
      })
    }
  }, [equipment])

  const editEquipment = async () => {
    const { name, description } = formEl.current

    const editedEquipment = {
      name: name.value,
      description: description.value,
    }

    return await updateEquipment(id, editedEquipment)
  }

  const editLabAccess = async () => {
    const { labs } = formEl.current

    const checkedLabIds = []
    labs.forEach((lab) => {
      if (lab.checked) {
        checkedLabIds.push(parseInt(lab.id))
      }
    })

    const labsToAdd = []
    checkedLabIds.forEach((checkedLabId) => {
      if (!initialLabs.includes(checkedLabId)) {
        labsToAdd.push(checkedLabId)
      }
    })

    const labsToRemove = []
    initialLabs.forEach((initialLab) => {
      if (!checkedLabIds.includes(initialLab)) {
        labsToRemove.push(initialLab)
      }
    })

    const addLabPromises = labsToAdd.map((labId) => {
      const labEquipment = { lab_id: labId, equipment_id: parseInt(id) }
      return createLabEquipment(labEquipment)
    })

    const removeLabPromises = labsToRemove.map((labId) => {
      const labEquipment = { lab_id: labId, equipment_id: parseInt(id) }
      return deleteLabEquipment(labEquipment)
    })

    try {
      await Promise.all(addLabPromises)
      await Promise.all(removeLabPromises)
    } catch (error) {
      throw Error(error.status)
    }
  }

  const saveEquipment = async () => {
    await editEquipment()
    await editLabAccess()
    navigate(`/equipment/${id}`)
  }

  const cancelClick = () => {
    navigate(`/equipment/${parseInt(id)}`)
  }

  return (
    <EquipmentForm
      formEl={formEl}
      submitFunction={saveEquipment}
      cancelFunction={cancelClick}
      title="Edit Equipment"
    />
  )
}
