import { useEffect, useState } from "react"
import { getProfile } from "../../data/profile"
import { CompleteMaintenance } from "../../components/modals/CompleteMaintenance"
import { LabManagerDashboard } from "./LabManagerDashboard"
import { ApproveAccessModal } from "../../components/modals/ApproveAccessModal"
import { ResearcherDashboard } from "./ResearcherDashboard"

export const Home = () => {
  const [profile, setProfile] = useState({})
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [requestId, setRequestId] = useState(0)
  const [ticketId, setTicketId] = useState(0)

  useEffect(() => {
    getProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData)
      }
    })
  }, [])

  return (
    <div className="page-container">
      <CompleteMaintenance
        setShowModal={setShowCompleteModal}
        showModal={showCompleteModal}
        ticketId={ticketId}
        title="Complete"
      />
      <CompleteMaintenance
        setShowModal={setShowScheduleModal}
        showModal={showScheduleModal}
        ticketId={ticketId}
        title="Schedule"
      />
      <ApproveAccessModal
        requestId={requestId}
        setShowModal={setShowApproveModal}
        showModal={showApproveModal}
      />
      <div className="text-center italic font-bold text-3xl my-12">
        Welcome
        {profile.first_name ? `, ${profile.first_name}` : "to Lab Fairy!"}
      </div>
      {profile.is_superuser ? (
        <LabManagerDashboard
          setShowApproveModal={setShowApproveModal}
          setShowCompleteModal={setShowCompleteModal}
          setShowScheduleModal={setShowScheduleModal}
          setRequestId={setRequestId}
          setTicketId={setTicketId}
          showApproveModal={showApproveModal}
          showCompleteModal={showCompleteModal}
          showScheduleModal={showScheduleModal}
        />
      ) : (
        <ResearcherDashboard />
      )}
    </div>
  )
}
