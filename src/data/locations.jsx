import { fetchWithResponse, getOptions } from "./fetcher"

export const getBuildings = async () => {
  return await fetchWithResponse("buildings", getOptions())
}

export const getRooms = async () => {
  return await fetchWithResponse("rooms", getOptions())
}

export const getLocations = async () => {
  return await fetchWithResponse("locations", getOptions())
}
