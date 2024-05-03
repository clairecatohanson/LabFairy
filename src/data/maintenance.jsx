import { fetchWithResponse, getOptions } from "./fetcher"

export const getMaintenanceTypes = async () => {
  return await fetchWithResponse("maintenance_types", getOptions())
}
