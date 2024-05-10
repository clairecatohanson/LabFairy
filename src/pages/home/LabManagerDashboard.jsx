import { useEffect, useState } from "react"
import { getMaintenanceTickets } from "../../data/equipmentmaintenance"
import { getEquipmentRequests } from "../../data/equipmentrequest"
import { useNavigate } from "react-router-dom"
import { getOrders } from "../../data/orders"
import { getSupplyRequests } from "../../data/supplyrequest"

export const LabManagerDashboard = ({
  setRequestId,
  setShowApproveModal,
  setShowCompleteModal,
  setShowScheduleModal,
  setTicketId,
  showApproveModal,
  showCompleteModal,
  showScheduleModal,
}) => {
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([])
  const [pendingMaintenance, setPendingMaintenance] = useState([])
  const [equipmentRequests, setEquipmentRequests] = useState([])
  const [openOrder, setOpenOrder] = useState({})
  const [openSupplyRequests, setOpenSupplyRequests] = useState([])
  const [itemsPendingReceipt, setItemsPendingReceipt] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getOrders({ query: "status=open" }).then((data) => {
      if (data) {
        setOpenOrder(data[0])
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

  useEffect(() => {
    if (showApproveModal == false)
      getEquipmentRequests({ query: "progress=pending" }).then(
        (requestData) => {
          if (requestData) {
            setEquipmentRequests(requestData)
          }
        }
      )
  }, [showApproveModal])

  useEffect(() => {
    if (showCompleteModal === false && showScheduleModal === false) {
      getMaintenanceTickets({
        query: "progress=scheduled&limit=3",
      }).then((ticketData) => {
        if (ticketData) {
          setUpcomingMaintenance(ticketData)
        }
      })

      getMaintenanceTickets({ query: "progress=requested&limit=3" }).then(
        (ticketData) => {
          if (ticketData) {
            setPendingMaintenance(ticketData)
          }
        }
      )
    }
  }, [showCompleteModal, showScheduleModal])

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
            {/* Open Order */}
            <div className="flex flex-col space-y-6 items-center ">
              <div className="bg-bluegreen-100/30 rounded-xl p-4 w-full">
                <h3 className="dashboard-heading">Current Open Order</h3>
                {openOrder?.id ? (
                  <div className="centered">
                    <button
                      className="btn bg-white border-bluegreen-600 shadow"
                      onClick={() => {
                        navigate(`/orders/${openOrder.id}`)
                      }}
                    >
                      View
                    </button>
                  </div>
                ) : (
                  <div> There is currently no open order</div>
                )}
              </div>
              {/* Open Supply Requests */}
              <div className="bg-bluegreen-100/30 rounded-xl p-4 w-full">
                <h3 className="dashboard-heading">Pending Supply Requests</h3>
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
                            <div>{request.date_requested?.split("T")[0]}</div>
                          </div>
                          <div>
                            <button
                              className="btn bg-white border-bluegreen-600 shadow"
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
                  <div>There are currently no pending supply requests</div>
                )}
              </div>
              {/* Items Pending Receipt */}
              <div className="bg-bluegreen-100/30 rounded-xl p-4 w-full">
                <h3 className="dashboard-heading">Items Pending Receipt</h3>
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
                                {request.order.date_completed?.split("T")[0]}
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              className="btn bg-white border-bluegreen-600 shadow"
                              onClick={() => {
                                navigate(`/orders/${request.order.id}`)
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
                  <div>There are currently no items pending receipt</div>
                )}
              </div>
            </div>
          </section>

          {/* Center Panel */}
          <section className="flex justify-center">
            {/* Upcoming Maintenance */}
            <div className="flex flex-col space-y-6 items-center">
              <div className="bg-bluegreen-100/30 rounded-xl p-4 w-full">
                <h3 className="dashboard-heading">Upcoming Maintenance</h3>
                {upcomingMaintenance.length ? (
                  <div className="flex flex-col space-y-2 mb-6">
                    {upcomingMaintenance.map((ticket) => (
                      <div
                        className="p-2 bg-bluegreen-300 rounded w-80 shadow-lg"
                        key={ticket.id}
                      >
                        <h4 className="font-bold">
                          {ticket.equipment.name} - {ticket.maintenance.name}
                        </h4>
                        <div className="flex flex-row justify-between items-center">
                          <div>
                            <div>Date Scheduled: </div>
                            <div>{ticket.date_scheduled}</div>
                          </div>
                          <div>
                            <button
                              className="btn bg-white border-bluegreen-600 shadow "
                              onClick={() => {
                                const id = ticket.id
                                setShowCompleteModal(true)
                                setTicketId(id)
                              }}
                            >
                              <i className="fa-regular fa-circle-check"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>There is currently no scheduled maintenance</div>
                )}
              </div>
              {/* Pending Maintenance */}
              <div className="bg-bluegreen-100/30 rounded-xl p-4 w-full">
                <h3 className="dashboard-heading">Pending Maintenance</h3>
                {pendingMaintenance.length ? (
                  <div className="flex flex-col space-y-2 mb-6">
                    {pendingMaintenance.map((ticket) => (
                      <div
                        className="p-2 bg-bluegreen-300 rounded w-80 shadow-lg"
                        key={ticket.id}
                      >
                        <h4 className="font-bold">
                          {ticket.equipment.name} - {ticket.maintenance.name}
                        </h4>
                        <div className="flex flex-row justify-between items-center">
                          <div>
                            <div>Date Needed: </div>
                            <div>{ticket.date_needed}</div>
                          </div>
                          <div>
                            <button
                              className="btn bg-white border-bluegreen-600 shadow"
                              onClick={() => {
                                const id = ticket.id
                                setShowScheduleModal(true)
                                setTicketId(id)
                              }}
                            >
                              <i className="fa-regular fa-calendar-check"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>There is currently no pending maintenance</div>
                )}
              </div>
            </div>
          </section>
          {/* Right Panel */}
          <section>
            {/* Pending Equipment Requests */}
            <div className="flex flex-col space-y-6 items-center">
              <div className="bg-bluegreen-100/30 rounded-xl p-4 w-full">
                <h3 className="dashboard-heading">
                  Pending Equipment Requests
                </h3>
                {equipmentRequests.length ? (
                  <div className="flex flex-col space-y-2 mb-6">
                    {equipmentRequests.map((request) => (
                      <div
                        className="p-2 bg-bluegreen-300 rounded w-80 shadow-lg"
                        key={request.id}
                      >
                        <h4 className="font-bold">
                          {request.equipment.name} -{" "}
                          {request.researcher.user.first_name}{" "}
                          {request.researcher.user.last_name}
                        </h4>
                        <div className="flex flex-row justify-between items-center">
                          <div>
                            <div>Date Trained: </div>
                            <div>{request.training_date}</div>
                          </div>
                          <div>
                            <button
                              className="btn bg-white border-bluegreen-600 shadow"
                              onClick={() => {
                                const id = request.id
                                setShowApproveModal(true)
                                setRequestId(id)
                              }}
                            >
                              <i className="fa-regular fa-circle-check"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>There are currently no pending requests</div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
