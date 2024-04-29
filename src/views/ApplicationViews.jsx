import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { NewEquipment } from "../pages/equipment/NewEquipment"
import { EditEquipment } from "../pages/equipment/EditEquipment"

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
        <Route path="new-equipment" element={<NewEquipment />} />
        <Route path="equipment/:id/edit" element={<EditEquipment />} />
      </Route>
    </Routes>
  )
}
