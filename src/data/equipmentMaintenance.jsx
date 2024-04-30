import {
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const createTicket = async (ticketObject) => {
  return await fetchWithResponse("maintenance", postOptions(ticketObject))
}

export const getMaintenanceTickets = async ({ ticketId, query } = {}) => {
  let resource = "maintenance"
  if (ticketId) {
    resource += `/${ticketId}`
  }
  if (query) {
    resource += `?${query}`
  }
  return await fetchWithResponse(resource, getOptions())
}

export const updateTicket = async (ticketId, ticketObject) => {
  return await fetchWithoutResponse(
    `maintenance/${ticketId}`,
    putOptions(ticketObject)
  )
}
