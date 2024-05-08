import { useEffect } from "react"
import { useState } from "react"
import { getInventoryItems } from "../../data/inventoryitems"
import { useNavigate, useParams } from "react-router-dom"
import { getInventories } from "../../data/inventory"

export const AllInventoryItems = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [inventoryItems, setInventoryItems] = useState([])
  const [inventory, setInventory] = useState({})

  useEffect(() => {
    getInventoryItems(id).then((data) => {
      if (data) {
        setInventoryItems(data)
      }
    })

    getInventories({ inventoryId: id }).then((data) => {
      if (data) {
        setInventory(data)
      }
    })
  }, [id])

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="page-heading mb-12">{inventory.name} Inventory</h2>
      </header>
      <section className="max-w-3xl mx-auto">
        <table className="w-4/5 mx-auto">
          <thead className="flex space-x-4 mb-3">
            <tr className="flex space-x-4">
              <th className="w-60 text-left">Name</th>
              <th className="w-28 text-left">Vendor</th>
              <th className="w-20 text-left">Price</th>
              <th className="w-60 text-left">Location</th>
            </tr>
          </thead>
          <tbody className="flex flex-col space-y-2">
            {inventoryItems.map((item) => (
              <tr
                key={item.id}
                className="flex space-x-4"
                onClick={() => {
                  navigate(`consumable/${item.id}`)
                }}
              >
                <td className="w-60">{item.consumable.name}</td>
                <td className="w-28">{item.consumable.vendor}</td>
                <td className="w-20">${item.consumable.price}</td>
                <td className="w-60">{item.location.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
