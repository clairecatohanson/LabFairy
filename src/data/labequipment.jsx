import {
  deleteOptions,
  fetchWithResponse,
  fetchWithoutResponse,
  postOptions,
} from "./fetcher"

export const createLabEquipment = async (labEquipment) => {
  return await fetchWithResponse("labequipment", postOptions(labEquipment))
}

export const deleteLabEquipment = async (labEquipment) => {
  return await fetchWithoutResponse("labequipment", deleteOptions(labEquipment))
}
