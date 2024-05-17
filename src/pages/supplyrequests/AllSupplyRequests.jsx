import { useContext, useEffect } from "react"
import { useState } from "react"
import {
  getSupplyRequests,
  updateSupplyRequest,
} from "../../data/supplyrequest"
import { AppContext } from "../../context/AppWrapper"
import { createOrder, getOrders } from "../../data/orders"
import { SupplyRequestList } from "../../components/SupplyRequestList"
import { createInventoryItem } from "../../data/inventoryitems"

export const AllSupplyRequests = () => {
  const { user } = useContext(AppContext)

  const [openSupplyRequests, setOpenSupplyRequests] = useState([])
  const [orderedSupplies, setOrderedSupplies] = useState([])
  const [openOrder, setOpenOrder] = useState({})
  const [clickCounter, setClickCounter] = useState(0)

  useEffect(() => {
    if (user.admin) {
      getOrders({ query: "status=open" }).then((data) => {
        if (data.length) {
          setOpenOrder(data[0])
        } else {
          setOpenOrder({})
        }
      })
    }
  }, [user])

  useEffect(() => {
    getSupplyRequests({ query: "status=requested" }).then((data) => {
      if (data) {
        setOpenSupplyRequests(data)
      }
    })

    getSupplyRequests({ query: "status=ordered" }).then((data) => {
      if (data) {
        setOrderedSupplies(data)
      }
    })
  }, [clickCounter])

  const addToOrder = async (request) => {
    const requestId = request.id
    if (!openOrder.id) {
      const newOpenOrder = await createOrder()
      const orderId = newOpenOrder.id
      const updatedRequest = { order_id: orderId }
      await updateSupplyRequest(requestId, updatedRequest)
      setClickCounter(clickCounter + 1)
      setOpenOrder(newOpenOrder)
    }

    const orderId = openOrder.id
    const updatedRequest = { order_id: orderId }
    await updateSupplyRequest(requestId, updatedRequest)
    setClickCounter(clickCounter + 1)
  }

  const receiveItem = async (request) => {
    const requestId = request.id
    const updatedRequest = { date_received: new Date() }
    await updateSupplyRequest(requestId, updatedRequest)
    const newItem = {
      inventory_id: request.inventory,
      consumable_id: request.consumable.id,
    }
    await createInventoryItem(newItem)
    setClickCounter(clickCounter + 1)
  }

  return (
    <div className="page-container">
      <SupplyRequestList
        clickFunction={addToOrder}
        supplyRequests={openSupplyRequests}
        title="Open Supply Requests"
      />
      <SupplyRequestList
        addedClasses="mt-24"
        clickFunction={receiveItem}
        supplyRequests={orderedSupplies}
        title="Ordered Items Awaiting Receipt"
      />
    </div>
  )
}
