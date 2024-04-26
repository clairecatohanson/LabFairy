import { fetchWithResponse, postOptions } from "./fetcher"

export const createEquipment = async (equipment) => {
  return await fetchWithResponse("equipment", postOptions(equipment))
}

export const createLabEquipment = async (labEquipment) => {
  return await fetchWithResponse("labequipment", postOptions(labEquipment))
}
