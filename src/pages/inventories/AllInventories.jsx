import { useEffect, useState } from "react"
import { getInventories } from "../../data/inventory"
import { InventoryCard } from "../../components/cards/InventoryCard"

export const AllInventories = () => {
  const [inventories, setInventories] = useState([])

  useEffect(() => {
    getInventories().then((data) => {
      if (data) {
        setInventories(data)
      }
    })
  }, [])

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="page-heading">Your Inventories</h2>
      </header>
      <section className="flex flex-col space-y-4 items-center md:flex-row w-11/12 mx-auto md:justify-center md:space-y-0 md:space-x-8">
        {inventories.map((inventory) => (
          <InventoryCard key={inventory.id} inventory={inventory} />
        ))}
      </section>
    </div>
  )
}
