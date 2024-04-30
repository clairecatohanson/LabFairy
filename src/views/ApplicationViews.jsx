import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { NewEquipment } from "../pages/equipment/NewEquipment"
import { EditEquipment } from "../pages/equipment/EditEquipment"
import { NewEquipmentMaintenance } from "../pages/maintenanceTickets/NewEquipmentMaintenance"
import { EditEquipmentMaintenance } from "../pages/maintenanceTickets/EditEquipmentMaintenance"
import { AllEquipment } from "../pages/equipment/AllEquipment"
import { EquipmentDetails } from "../pages/equipment/EquipmentDetails"
import { AllMaintenance } from "../pages/maintenanceTickets/AllMaintenance"

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
        <Route path="equipment" element={<AllEquipment />} />
        <Route path="equipment/:id" element={<EquipmentDetails />} />
        <Route path="new-equipment" element={<NewEquipment />} />
        <Route path="equipment/:id/edit" element={<EditEquipment />} />
        <Route path="maintenance" element={<AllMaintenance />} />
        <Route path="new-maintenance" element={<NewEquipmentMaintenance />} />
        <Route
          path="maintenance/:id/edit"
          element={<EditEquipmentMaintenance />}
        />
      </Route>
    </Routes>
  )
}
