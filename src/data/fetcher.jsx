const apiURL = "https://lab-fairy-api-5wbtn.ondigitalocean.app"

const checkError = (res) => {
  if (!res.ok) {
    throw Error(res.status)
  }
  return res
}

const checkErrorJson = async (res) => {
  if (res.status == 200 || res.status == 201) {
    return await res.json()
  } else {
    throw Error(res.status)
  }
}

const catchError = (err) => {
  if (err.message === "401") {
    window.location.href = "/login"
  }
  if (err.message === "400" || err.message === "404") {
    window.alert("Bad request. Please check the data submitted and try again.")
  }
  if (err.message === "403") {
    window.alert("Error: You are not authorized to perform this action.")
    window.location.href = "/"
  }
  if (err.message === "409") {
    window.alert(
      "Username is unavailable. Please enter another username and try again."
    )
  }
}

export const deleteOptions = (dataObject = undefined) => {
  const userToken = JSON.parse(localStorage.getItem("fairy_auth")).token
  if (!dataObject) {
    return {
      method: "DELETE",
      headers: {
        Authorization: `Token ${userToken}`,
      },
    }
  } else {
    return {
      method: "DELETE",
      headers: {
        Authorization: `Token ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObject),
    }
  }
}

export const getOptions = () => {
  const userToken = JSON.parse(localStorage.getItem("fairy_auth")).token
  return {
    method: "GET",
    headers: {
      Authorization: `Token ${userToken}`,
    },
  }
}

export const postOptions = (dataObject) => {
  const userToken = JSON.parse(localStorage.getItem("fairy_auth")).token
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    },
    body: JSON.stringify(dataObject),
  }
}

export const putOptions = (dataObject) => {
  const userToken = JSON.parse(localStorage.getItem("fairy_auth")).token
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    },
    body: JSON.stringify(dataObject),
  }
}

export const fetchWithResponse = async (endpoint, fetchOptions) => {
  try {
    const response = await fetch(`${apiURL}/${endpoint}`, fetchOptions)
    const data = await checkErrorJson(response)
    return data
  } catch (error) {
    catchError(error)
  }
}

export const fetchWithoutResponse = async (endpoint, fetchOptions) => {
  try {
    const response = await fetch(`${apiURL}/${endpoint}`, fetchOptions)
    return checkError(response)
  } catch (error) {
    catchError(error)
  }
}
