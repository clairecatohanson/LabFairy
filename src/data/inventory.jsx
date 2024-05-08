import { fetchWithResponse, getOptions } from "./fetcher"

export const getInventories = async ({ inventory_id } = {}) => {
  let resource = "inventories"
  if (inventory_id) {
    resource += `/${inventory_id}`
  }
  return await fetchWithResponse(resource, getOptions())
}
