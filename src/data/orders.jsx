import {
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const getOrders = async ({ query, orderId } = {}) => {
  let resource = "orders"
  if (orderId) {
    resource += `/${orderId}`
  }
  if (query) {
    resource += `?${query}`
  }

  return await fetchWithResponse(resource, getOptions())
}

export const createOrder = async () => {
  return await fetchWithResponse("orders", postOptions())
}

export const updateOrder = async (orderId, updatedOrder) => {
  return await fetchWithoutResponse(
    `orders/${orderId}`,
    putOptions(updatedOrder)
  )
}
