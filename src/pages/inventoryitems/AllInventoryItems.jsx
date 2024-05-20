import { useEffect } from "react"
import { useState } from "react"
import { getInventoryItems } from "../../data/inventoryitems"
import { useNavigate, useParams } from "react-router-dom"
import { getInventories } from "../../data/inventory"
import { InventoryFilterBar } from "../../components/filterbars/InventoryFilterBar"

export const AllInventoryItems = () => {
  const { inventoryId } = useParams()
  const navigate = useNavigate()

  const [inventoryItems, setInventoryItems] = useState([])
  const [inventory, setInventory] = useState({})

  useEffect(() => {
    getInventoryItems({
      inventory_id: inventoryId,
      query: "status=available",
    }).then((data) => {
      if (data) {
        setInventoryItems(data)
      }
    })

    getInventories({ inventory_id: inventoryId }).then((data) => {
      if (data) {
        setInventory(data)
      }
    })
  }, [inventoryId])

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="page-heading mb-12">{inventory.name} Inventory</h2>
        <div className="page-header-actions">
          <InventoryFilterBar
            inventoryId={inventory.id}
            setInventoryItems={setInventoryItems}
          />
        </div>
      </header>
      <section className="max-w-3xl mx-auto">
        <table className="w-4/5 mx-auto">
          <thead className="flex space-x-4 mb-3">
            <tr className="flex space-x-4">
              <th className="w-60 text-left">Name</th>
              <th className="w-28 text-left">Vendor</th>
              <th className="w-20 text-left">Price</th>
              <th className="w-60 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="flex flex-col space-y-2">
            {inventoryItems.map((item) => (
              <tr
                key={item.id}
                className="flex space-x-4 hover:outline hover:outline-bluegreen-500 rounded hover:outline-2 hover:bg-bluegreen-100/20 hover:cursor-pointer"
                onClick={() => {
                  navigate(`/consumables/${item.id}`)
                }}
              >
                <td className="w-60">{item.consumable.name}</td>
                <td className="w-28">{item.consumable.vendor}</td>
                <td className="w-20">${item.consumable.price}</td>
                <td className="w-60">
                  {item.depleted ? "Out of Stock" : "Available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
