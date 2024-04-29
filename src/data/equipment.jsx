import {
  deleteOptions,
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const createEquipment = async (equipment) => {
  return await fetchWithResponse("equipment", postOptions(equipment))
}

export const createLabEquipment = async (labEquipment) => {
  return await fetchWithResponse("labequipment", postOptions(labEquipment))
}

export const deleteLabEquipment = async (labEquipment) => {
  return await fetchWithoutResponse("labequipment", deleteOptions(labEquipment))
}

export const getEquipment = async (equipment_id = undefined) => {
  let resource = "equipment"
  if (equipment_id) {
    resource += `/${equipment_id}`
  }
  return await fetchWithResponse(resource, getOptions())
}

export const updateEquipment = async (equipmentId, equipmentObject) => {
  return await fetchWithoutResponse(
    `equipment/${equipmentId}`,
    putOptions(equipmentObject)
  )
}
