import {
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const createSupplyRequest = async (newRequest) => {
  return await fetchWithResponse("supplyrequests", postOptions(newRequest))
}

export const getSupplyRequests = async ({ query } = {}) => {
  let resource = "supplyrequests"
  if (query) {
    resource += `?${query}`
  }
  return await fetchWithResponse(resource, getOptions())
}

export const updateSupplyRequest = async (requestId, updatedRequest) => {
  return await fetchWithoutResponse(
    `supplyrequests/${requestId}`,
    putOptions(updatedRequest)
  )
}
