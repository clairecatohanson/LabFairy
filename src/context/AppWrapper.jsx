import { useEffect, useState, createContext } from "react"
import { useNavigate } from "react-router-dom"

export const AppContext = createContext()

export const AppWrapper = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState()
  const [user, setUser] = useState({})

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("fairy_auth"))
    if (auth && auth.valid) {
      setToken(auth.token)
      setUser({ user_id: auth.id, admin: auth.superuser })
    } else {
      setToken({})
      navigate("/login")
    }
  }, [])

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}
