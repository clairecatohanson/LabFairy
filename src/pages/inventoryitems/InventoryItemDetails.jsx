import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import {
  getInventoryItem,
  updateInventoryItem,
} from "../../data/inventoryitems"
import { Input } from "../../components/form-elements/Input"
import { createSupplyRequest } from "../../data/supplyrequest"

export const InventoryItemDetails = () => {
  const { itemId } = useParams()
  const quantityEl = useRef()

  const [inventoryItem, setInventoryItem] = useState({})
  const [restockStatus, setRestockStatus] = useState("")
  const [depleted, setDepleted] = useState(false)

  useEffect(() => {
    getInventoryItem(itemId).then((data) => {
      if (data) {
        setInventoryItem(data)
      }
    })
  }, [itemId, depleted])

  useEffect(() => {
    if (inventoryItem.id) {
      if (inventoryItem.depleted) {
        setDepleted(true)
      } else {
        setDepleted(false)
      }

      if (inventoryItem.consumable.supply_requests.length) {
        const requestedInventoryItem =
          inventoryItem.consumable.supply_requests.find(
            (request) =>
              (!request.order ||
                (request.order.id && !request.order.date_completed)) &&
              request.inventory.id === inventoryItem.inventory.id
          )
        const orderedInventoryItem =
          inventoryItem.consumable.supply_requests.find(
            (request) =>
              request.order?.id &&
              request.order?.date_completed &&
              !request.date_received &&
              request.inventory.id === inventoryItem.inventory.id
          )

        const receivedInventoryItems =
          inventoryItem.consumable.supply_requests.filter(
            (request) =>
              request.order?.id &&
              request.order?.date_completed &&
              request.date_received &&
              request.inventory.id === inventoryItem.inventory.id
          )

        if (receivedInventoryItems.length) {
          const sortedReceivedItems = receivedInventoryItems.sort(
            (a, b) => b.date_received - a.date_received
          )
          const latestReceived = sortedReceivedItems[0]
          setRestockStatus(
            `Last restock date: ${latestReceived.date_received.split("T")[0]}`
          )
        }
        if (requestedInventoryItem) {
          setRestockStatus("Restock requested. Awaiting order completion.")
        }
        if (orderedInventoryItem) {
          setRestockStatus(
            "Restock requested, and item has been ordered. Awaiting receipt."
          )
        }
      }
    }
  }, [inventoryItem])

  const markAsDepleted = async () => {
    const itemObject = { depleted: true }
    await updateInventoryItem(itemId, itemObject)
    setDepleted(true)
  }

  const requestRestock = async (e) => {
    e.preventDefault()

    const newRequest = {
      consumable_id: inventoryItem.consumable.id,
      quantity: quantityEl.current.value,
      inventory_id: inventoryItem.inventory.id,
    }

    const requestResponse = await createSupplyRequest(newRequest)
    if (requestResponse) {
      setRestockStatus("Restock requested. Awaiting order completion")
    }
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
          {!depleted ? (
            <button className="btn" onClick={markAsDepleted}>
              Mark As Depleted
            </button>
          ) : (
            <div>Out of Stock</div>
          )}
        </div>
      </section>
      <div className="centered mt-12">
        {restockStatus ? (
          <div className="bg-white p-4 rounded-xl shadow">{restockStatus}</div>
        ) : (
          <div className="p-6"></div>
        )}
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
