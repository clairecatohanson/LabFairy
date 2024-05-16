import { useEffect, useState } from "react"
import { getEquipmentRequests } from "../../data/equipmentrequest"
import { getSupplyRequests } from "../../data/supplyrequest"
import { useNavigate } from "react-router-dom"

export const ResearcherDashboard = () => {
  const navigate = useNavigate()

  const [equipmentRequests, setEquipmentRequests] = useState([])
  const [openSupplyRequests, setOpenSupplyRequests] = useState([])
  const [itemsPendingReceipt, setItemsPendingReceipt] = useState([])

  useEffect(() => {
    getEquipmentRequests({ query: "progress=pending" }).then((requestData) => {
      if (requestData) {
        setEquipmentRequests(requestData)
      }
    })

    getSupplyRequests({ query: "status=requested&limit=3" }).then((data) => {
      if (data) {
        setOpenSupplyRequests(data)
      }
    })

    getSupplyRequests({ query: "status=ordered&limit=3" }).then((data) => {
      if (data) {
        setItemsPendingReceipt(data)
      }
    })
  }, [])

  return (
    <>
      <div className="bg-bluegreen-500 w-[98%] mx-auto rounded-lg py-6 px-3 mb-12">
        <h3 className="page-heading text-center mb-12">
          Your Personal Dashboard
        </h3>
        {/* Dashboard Container */}
        <div className="flex justify-center space-x-4">
          {/* Left Panel */}
          <section className="flex justify-center">
            {/* Open Supply Requests */}
            <div className="bg-bluegreen-100/30 rounded-xl p-4 w-full">
              <h3 className="dashboard-heading">
                Your Pending Supply Requests
              </h3>
              {openSupplyRequests.length ? (
                <div className="flex flex-col space-y-2 mb-6">
                  {openSupplyRequests.map((request) => (
                    <div
                      className="p-2 bg-bluegreen-300 rounded w-80 shadow-lg"
                      key={request.id}
                    >
                      <h4 className="font-bold">
                        {request.consumable.name} -{" "}
                        {request.researcher?.user.first_name}
                      </h4>
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          <div>Date Requested: </div>
                          <div>{request.date_requested.split("T")[0]}</div>
                        </div>
                        <div>
                          <button
                            className="btn"
                            onClick={() => {
                              navigate("/supplyrequests")
                            }}
                          >
                            <i className="fa-solid fa-magnifying-glass-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>You currently have no pending supply requests</div>
              )}
            </div>
          </section>

          {/* Center Panel */}
          <section className="flex justify-center">
            {/* Items Pending Receipt */}
            <div className="bg-bluegreen-100/30 rounded-xl p-4 w-full">
              <h3 className="dashboard-heading">Your Items Pending Receipt</h3>
              {itemsPendingReceipt.length ? (
                <div className="flex flex-col space-y-2 mb-6">
                  {itemsPendingReceipt.map((request) => (
                    <div
                      className="p-2 bg-bluegreen-300 rounded w-80 shadow-lg"
                      key={request.id}
                    >
                      <h4 className="font-bold">
                        {request.consumable.name} -{" "}
                        {request.researcher?.user.first_name}
                      </h4>
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          <div className="flex space-x-2">
                            <div>Order Number: </div>
                            <div>{request.order.id}</div>
                          </div>
                          <div className="flex space-x-2">
                            <div>Date Ordered: </div>
                            <div>
                              {request.order.date_completed.split("T")[0]}
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            className="btn"
                            onClick={() => {
                              navigate("supplyrequests")
                            }}
                          >
                            <i className="fa-solid fa-magnifying-glass-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>You currently have no items pending receipt</div>
              )}
            </div>
          </section>
          {/* Right Panel */}
          <section>
            {/* Pending Equipment Requests */}
            <div className="flex flex-col space-y-6 items-center bg-bluegreen-100/30 rounded-xl p-4">
              <div>
                <h3 className="dashboard-heading">
                  Your Pending Equipment Requests
                </h3>
                {equipmentRequests.length ? (
                  <div className="flex flex-col space-y-2 mb-6">
                    {equipmentRequests.map((request) => (
                      <div
                        className="p-2 bg-bluegreen-300 rounded w-80 shadow-lg"
                        key={request.id}
                      >
                        <h4 className="font-bold">{request.equipment.name}</h4>
                        <div className="flex flex-row justify-between items-center">
                          <div>
                            <div>Date Trained: </div>
                            <div>{request.training_date}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>You currently have no pending requests</div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
