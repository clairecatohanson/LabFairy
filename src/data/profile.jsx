import { fetchWithResponse, getOptions } from "./fetcher"

export const getProfile = async () => {
  return await fetchWithResponse("profile", getOptions())
}
