import "./App.css"
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { EquipmentForm } from "./components/forms/EquipmentForm"
import { NewEquipmentForm } from "./pages/equipment/NewEquipmentForm"

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <NewEquipmentForm />
          </>
        }
      />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  )
}
