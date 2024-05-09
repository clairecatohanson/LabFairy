import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { NewEquipment } from "../pages/equipment/NewEquipment"
import { EditEquipment } from "../pages/equipment/EditEquipment"
import { NewEquipmentMaintenance } from "../pages/maintenanceTickets/NewEquipmentMaintenance"
import { EditEquipmentMaintenance } from "../pages/maintenanceTickets/EditEquipmentMaintenance"
import { AllEquipment } from "../pages/equipment/AllEquipment"
import { EquipmentDetails } from "../pages/equipment/EquipmentDetails"
import { AllMaintenance } from "../pages/maintenanceTickets/AllMaintenance"
import { Home } from "../pages/home/Home"
import { AllInventoryItems } from "../pages/inventoryitems/AllInventoryItems"
import { InventoryItemDetails } from "../pages/inventoryitems/InventoryItemDetails"
import { AllInventories } from "../pages/inventories/AllInventories"
import { AllSupplyRequests } from "../pages/supplyrequests/AllSupplyRequests"
import { OpenOrder } from "../pages/orders/OpenOrder"
import { AllOrders } from "../pages/orders/AllOrders"

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
        <Route path="" element={<Home />} />
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
        <Route path="inventories" element={<AllInventories />} />
        <Route
          path="inventories/:inventoryId"
          element={<AllInventoryItems />}
        />
        <Route path="consumables/:itemId" element={<InventoryItemDetails />} />
        <Route path="supplyrequests" element={<AllSupplyRequests />} />
        <Route path="orders" element={<AllOrders />} />
        <Route path="orders/:id" element={<OpenOrder />} />
      </Route>
    </Routes>
  )
}
