import { useNavigate } from "react-router-dom"
import { CardLayout } from "../layouts/CardLayout"

export const InventoryCard = ({ inventory }) => {
  const navigate = useNavigate()

  return (
    <CardLayout height="h-48" title={inventory.name} width="w-80">
      <div>{inventory.description}</div>
      <div>
        <button
          className="btn"
          onClick={() => {
            navigate(`${inventory.id}`)
          }}
        >
          View
        </button>
      </div>
    </CardLayout>
  )
}
