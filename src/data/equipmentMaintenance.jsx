import { fetchWithResponse, postOptions } from "./fetcher"

export const createTicket = async (ticketObject) => {
  return await fetchWithResponse("maintenance", postOptions(ticketObject))
}
