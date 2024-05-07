import { useEffect, useState } from "react"
import { getEquipmentRequests } from "../../data/equipmentrequest"

export const ResearcherDashboard = () => {
  const [equipmentRequests, setEquipmentRequests] = useState([])

  useEffect(() => {
    getEquipmentRequests({ query: "progress=pending" }).then((requestData) => {
      if (requestData) {
        setEquipmentRequests(requestData)
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
        <div className="flex justify-center">
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
