import { useContext, useEffect, useState } from "react"
import { getOrders, updateOrder } from "../../data/orders"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../../context/AppWrapper"
import { SupplyRequestList } from "../../components/SupplyRequestList"
import { updateSupplyRequest } from "../../data/supplyrequest"

export const OpenOrder = () => {
  const { id } = useParams()
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  const [order, setOrder] = useState({})
  const [orderItems, setOrderItems] = useState([])
  const [clickCounter, setClickCounter] = useState(0)

  useEffect(() => {
    if (id) {
      getOrders({ orderId: id }).then((data) => {
        if (data) {
          setOrder(data)
          setOrderItems(data?.lineitems)
        }
      })
    }
  }, [id, clickCounter])

  if (!user.admin) {
    return (
      <div className="centered text-lg mt-16">
        You are not authorized to view this page
      </div>
    )
  }

  const titles = () => {
    if (order.date_completed) {
      return "Completed Order"
    }
    return "Open Order"
  }

  const buttonClasses = () => {
    if (!order.date_completed) {
      return "invisible"
    }
  }

  const completeOrder = async () => {
    const updatedOrder = { date_completed: new Date() }
    await updateOrder(order.id, updatedOrder)
    navigate("/orders")
  }

  const receiveItem = async (request) => {
    const requestId = request.id
    const updatedRequest = { date_received: new Date() }
    await updateSupplyRequest(requestId, updatedRequest)
    setClickCounter(clickCounter + 1)
  }

  if (!order.id) {
    return (
      <div className="page-container">
        <header className="page-header">
          <h2 className="page-heading text-center">Invalid Order Number</h2>
        </header>
        <div className="mt-12 text-center text-lg">
          No order was found with the provided order number.
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <SupplyRequestList
        buttonClasses={buttonClasses()}
        clickFunction={receiveItem}
        supplyRequests={orderItems}
        title={titles()}
      />
      {!order.date_completed && (
        <div className="centered mt-12">
          <button
            className="btn bg-bluegreen-500 text-gray-100 border-2 border-bluegreen-700"
            onClick={completeOrder}
          >
            Complete Order
          </button>
        </div>
      )}
    </div>
  )
}
