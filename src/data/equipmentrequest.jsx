import {
  deleteOptions,
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const createAccessRequest = async (requestObject) => {
  return await fetchWithResponse(
    "equipmentrequests",
    postOptions(requestObject)
  )
}

export const getEquipmentRequests = async ({ query } = {}) => {
  let resource = "equipmentrequests"

  if (query) {
    resource += `?${query}`
  }

  return await fetchWithResponse(resource, getOptions())
}

export const updateEquipmentRequest = async (requestId, requestObject) => {
  return await fetchWithoutResponse(
    `equipmentrequests/${requestId}`,
    putOptions(requestObject)
  )
}

export const deleteEquipmentRequest = async (requestId) => {
  return await fetchWithoutResponse(
    `equipmentrequests/${requestId}`,
    deleteOptions()
  )
}
