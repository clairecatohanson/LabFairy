import {
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  putOptions,
} from "./fetcher"

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

export const updateInventoryItem = async (itemId, itemObject) => {
  return await fetchWithoutResponse(
    `inventoryconsumables/${itemId}`,
    putOptions(itemObject)
  )
}
