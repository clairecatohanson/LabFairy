import { fetchWithResponse, fetchWithoutResponse, putOptions } from "./fetcher"

export const login = async (user) => {
  return await fetchWithResponse("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export const register = async (newUser) => {
  return await fetchWithResponse("register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
}

export const updateResearcher = async (researcherId, updatedResearcher) => {
  return await fetchWithoutResponse(
    `researcher/${researcherId}`,
    putOptions(updatedResearcher)
  )
}
