import { fetchWithResponse, postOptions } from "./fetcher"

export const createSupplyRequest = async (newRequest) => {
  return await fetchWithResponse("supplyrequests", postOptions(newRequest))
}
