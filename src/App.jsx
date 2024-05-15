import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { AppWrapper } from "./context/AppWrapper"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <AppWrapper>
            <ApplicationViews />
          </AppWrapper>
        }
      />
    </Routes>
  )
}
