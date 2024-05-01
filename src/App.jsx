import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { AppWrapper } from "./context/AppWrapper"
import { Login } from "./pages/Login"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
