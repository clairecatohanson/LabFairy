import { fetchWithResponse, getOptions } from "./fetcher"

export const getBuildings = async () => {
  return await fetchWithResponse("buildings", getOptions())
}

export const getRooms = async (query = undefined) => {
  let resource = "rooms"
  if (query) {
    resource += `?${query}`
  }
  return await fetchWithResponse(resource, getOptions())
}

export const getLocations = async (query = undefined) => {
  let resource = "locations"
  if (query) {
    resource += `?${query}`
  }
  return await fetchWithResponse(resource, getOptions())
}
