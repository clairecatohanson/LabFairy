import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { getInventoryItem } from "../../data/inventoryitems"
import { Input } from "../../components/form-elements/Input"
import { createSupplyRequest } from "../../data/supplyrequest"

export const InventoryItemDetails = () => {
  const { itemId } = useParams()
  const quantityEl = useRef()

  const [inventoryItem, setInventoryItem] = useState({})
  const [restockStatus, setRestockStatus] = useState("")

  useEffect(() => {
    getInventoryItem(itemId).then((data) => {
      if (data) {
        setInventoryItem(data)
      }
    })
  }, [itemId])

  const requestRestock = async (e) => {
    e.preventDefault()

    const newRequest = {
      consumable_id: inventoryItem.consumable.id,
      quantity: quantityEl.current.value,
    }

    await createSupplyRequest(newRequest)
    setRestockStatus("Restock requested. Awaiting order")
    quantityEl.current.value = ""
  }

  return (
    <div className="page-container">
      <header className="page-header flex justify-between items-end">
        <h2 className="page-heading">Consumable in Inventory</h2>
      </header>
      <section className="flex flex-col space-y-4 items-center max-w-[40rem] mx-auto p-6 rounded-xl shadow bg-white">
        <h3 className="modal-heading">{inventoryItem.consumable?.name}</h3>
        <div className="flex space-x-4">
          <div className="font-bold">Inventory:</div>
          <div>{inventoryItem.inventory?.name}</div>
        </div>
        <div className="flex space-x-4">
          <div className="font-bold">Location:</div>
          <div>{inventoryItem.location?.name}</div>
        </div>
        <div>
          <button className="btn">Mark As Depleted</button>
        </div>
      </section>
      <div className="centered mt-12">
        <div className="bg-white p-4 rounded-xl shadow">
          Status: {restockStatus}
        </div>
      </div>
      <form className="bg-white w-80 flex flex-col items-center space-y-4 my-4 py-4 rounded-xl shadow mx-auto">
        <Input
          addedClasses="text-center"
          id="quantity"
          label="Quantity:"
          refEl={quantityEl}
          type="number"
          width="w-24"
        />
        <div className="centered">
          <button
            className="btn"
            onClick={(e) => {
              requestRestock(e)
            }}
          >
            Request Restock
          </button>
        </div>
      </form>
    </div>
  )
}
