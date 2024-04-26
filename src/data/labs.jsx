import { fetchWithResponse, getOptions } from "./fetcher"

export const getLabs = async () => {
  return await fetchWithResponse("labs", getOptions())
}
