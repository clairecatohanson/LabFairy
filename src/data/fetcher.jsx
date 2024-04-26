const apiURL = "http://localhost:8000"

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
    window.location.href = "/"
  }
  if (err.message === "404") {
    throw Error(err.message)
  }
}

export const getOptions = () => {
  return {
    method: "GET",
    headers: {
      Authorization: "Token 91dddf9bcff7eb81f18d40622baa0dede6c22278",
    },
  }
}

export const postOptions = (dataObject) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token 91dddf9bcff7eb81f18d40622baa0dede6c22278",
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
