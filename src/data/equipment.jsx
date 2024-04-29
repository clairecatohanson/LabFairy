import {
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const createEquipment = async (equipment) => {
  return await fetchWithResponse("equipment", postOptions(equipment))
}

export const getEquipment = async ({ equipment_id, query } = {}) => {
  let resource = "equipment"
  if (equipment_id) {
    resource += `/${equipment_id}`
  }
  if (query) {
    resource += `?${query}`
  }
  return await fetchWithResponse(resource, getOptions())
}

export const updateEquipment = async (equipmentId, equipmentObject) => {
  return await fetchWithoutResponse(
    `equipment/${equipmentId}`,
    putOptions(equipmentObject)
  )
}
