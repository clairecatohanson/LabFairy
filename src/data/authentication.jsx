import { fetchWithResponse } from "./fetcher"

export const login = async (user) => {
  return await fetchWithResponse("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}
