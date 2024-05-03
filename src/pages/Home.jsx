import { useEffect, useState } from "react"
import { getProfile } from "../data/profile"
import { getMaintenanceTickets } from "../data/equipmentmaintenance"
import { CompleteMaintenance } from "../components/modals/CompleteMaintenance"

export const Home = () => {
  const [profile, setProfile] = useState({})
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([])
  const [pendingMaintenance, setPendingMaintenance] = useState([])
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [ticketId, setTicketId] = useState(0)

  useEffect(() => {
    getProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData)
      }
    })

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
  }, [showCompleteModal, showScheduleModal])

  return (
    <div className="page-container">
      {showCompleteModal && (
        <CompleteMaintenance
          setShowModal={setShowCompleteModal}
          ticketId={ticketId}
          title="Complete"
        />
      )}
      {showScheduleModal && (
        <CompleteMaintenance
          setShowModal={setShowScheduleModal}
          ticketId={ticketId}
          title="Schedule"
        />
      )}
      <div className="text-center italic font-bold text-3xl my-12">
        Welcome
        {profile.first_name ? `, ${profile.first_name}` : "to Lab Fairy!"}
      </div>
      {profile.is_superuser && (
        <section className="bg-bluegreen-500 w-[98%] mx-auto rounded-lg py-6 px-3 mb-12">
          <h3 className="page-heading text-center mb-12">
            Your Personal Dashboard
          </h3>
          <div className="flex justify-center">
            <div className="flex flex-col space-y-6 items-center bg-bluegreen-100/30 rounded-xl p-4">
              <div>
                <h3 className="dashboard-heading">Upcoming Maintenance</h3>
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
                            className="btn"
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
              </div>
              <div>
                <h3 className="dashboard-heading">Pending Maintenance</h3>
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
                            className="btn"
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
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
