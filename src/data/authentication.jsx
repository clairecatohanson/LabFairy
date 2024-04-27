import { fetchWithResponse, postOptions } from "./fetcher"

export const login = async (user) => {
  return await fetchWithResponse("login", postOptions(user))
}
