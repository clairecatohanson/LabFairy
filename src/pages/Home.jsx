import { useEffect, useState } from "react"
import { getProfile } from "../data/profile"
import { ShortMaintenanceList } from "../components/ShortMaintenanceList"
import { getMaintenanceTickets } from "../data/equipmentmaintenance"

export const Home = () => {
  const [profile, setProfile] = useState({})
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([])
  const [pendingMaintenance, setPendingMaintenance] = useState([])

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
  }, [])

  return (
    <div className="page-container">
      <div className="welcome-message">
        Welcome
        {profile.first_name ? `, ${profile.first_name}` : "to Lab Fairy!"}
      </div>
      {profile.is_superuser && (
        <section>
          <h3>Your Personal Dashboard</h3>
          <div>
            <ShortMaintenanceList
              admin={profile.is_superuser}
              maintenanceList={upcomingMaintenance}
              title="Upcoming Maintenance"
            />
            <ShortMaintenanceList
              admin={profile.is_superuser}
              maintenanceList={pendingMaintenance}
              title="Pending Maintenance"
            />
          </div>
        </section>
      )}
    </div>
  )
}
