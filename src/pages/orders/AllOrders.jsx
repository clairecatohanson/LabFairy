import { useEffect, useState } from "react"
import { getOrders } from "../../data/orders"
import { OrderCard } from "../../components/cards/OrderCard"

export const AllOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders().then((data) => {
      if (data) {
        setOrders(data)
      }
    })
  }, [])

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="page-heading">Orders</h2>
      </header>
      <section className="flex flex-col space-y-4 items-center md:flex-row w-11/12 mx-auto md:justify-center md:space-y-0 md:space-x-8">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
    </div>
  )
}
