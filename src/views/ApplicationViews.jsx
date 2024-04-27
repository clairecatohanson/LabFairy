import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { NewEquipmentForm } from "../pages/equipment/NewEquipmentForm"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="new-equipment" element={<NewEquipmentForm />} />
      </Route>
    </Routes>
  )
}
