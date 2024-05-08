import { fetchWithResponse, getOptions } from "./fetcher"

export const getInventoryItems = async (inventory_id) => {
  const resource = `inventoryconsumables?inventory_id=${inventory_id}`
  return await fetchWithResponse(resource, getOptions())
}

export const getInventoryItem = async (inventoryConsumableId) => {
  return await fetchWithResponse(
    `inventoryconsumables/${inventoryConsumableId}`,
    getOptions()
  )
}
