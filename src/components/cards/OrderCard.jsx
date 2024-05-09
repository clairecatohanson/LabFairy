import { useNavigate } from "react-router-dom"
import { CardLayout } from "../layouts/CardLayout"

export const OrderCard = ({ order }) => {
  const navigate = useNavigate()

  return (
    <CardLayout height="h-48" title={`Order #${order.id}`} width="w-80">
      <div>
        <div className="mb-4">Order #{order.id}</div>
        {order.date_completed ? (
          <>
            <div className="italic font-bold">Closed</div>
            <div className="italic">
              Completed: {order.date_completed.split("T")[0]}
            </div>
          </>
        ) : (
          <div className="text-bluegreen-600 font-bold">Current Open Order</div>
        )}
      </div>
      <div>
        <button
          className="btn"
          onClick={() => {
            navigate(`${order.id}`)
          }}
        >
          View
        </button>
      </div>
    </CardLayout>
  )
}
