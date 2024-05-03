import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  deleteEquipment,
  getEquipment,
  updateEquipment,
} from "../../data/equipment"
import { getMaintenanceTickets } from "../../data/equipmentmaintenance"
import { AppContext } from "../../context/AppWrapper"
import { DeleteEquipmentModal } from "../../components/modals/DeleteEquipmentModal"
import { ShortMaintenanceList } from "../../components/ShortMaintenanceList"
// import "./equipmentDetails.css"

export const EquipmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AppContext)

  const [equipment, setEquipment] = useState({})
  const [archived, setArchived] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([])
  const [completedMaintenance, setCompletedMaintenance] = useState([])

  useEffect(() => {
    if (id) {
      getEquipment({ equipment_id: parseInt(id) }).then((equipmentData) => {
        if (equipmentData) {
          setEquipment(equipmentData)
        }
      })

      getMaintenanceTickets({
        query: `equipment_id=${parseInt(id)}&progress=scheduled&limit=3`,
      }).then((ticketData) => {
        if (ticketData) {
          setUpcomingMaintenance(ticketData)
        }
      })

      getMaintenanceTickets({
        query: `equipment_id=${parseInt(id)}&progress=completed&limit=3`,
      }).then((ticketData) => {
        if (ticketData) {
          setCompletedMaintenance(ticketData)
        }
      })
    }
  }, [id])

  useEffect(() => {
    if (equipment.id) {
      setArchived(equipment.archived)
    }
  }, [equipment])

  const editArchived = async () => {
    const equipmentId = parseInt(id)
    const updatedEquipment = {
      archived: !archived,
    }
    await updateEquipment(equipmentId, updatedEquipment)
    setArchived(!archived)
  }

  const destroyClick = () => {
    setShowModal(true)
  }

  const destroyEquipment = async () => {
    await deleteEquipment(parseInt(id))
    navigate("/equipment")
  }

  return (
    <div className="page-container">
      <DeleteEquipmentModal
        equipment={equipment}
        destroyEquipment={destroyEquipment}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <header className="page-header">
        <h2 className="page-heading text-center">{equipment.name}</h2>
      </header>
      {/* All Cards */}
      <div className="flex flex-col space-y-6 items-center justify-center md:flex-row md:space-y-0 md:space-x-6 md:items-start">
        {/* Left Section (Equipment Actions, Shared By, and Details) */}
        <div className="flex flex-col space-y-6">
          {/* Equipment Actions Card */}
          <section className="dashboard-card">
            <h3 className="dashboard-heading">Equipment Actions</h3>
            <div className="flex flex-col space-y-4 items-center">
              <div>
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/new-maintenance")
                  }}
                >
                  {user.admin ? "Schedule" : "Request"} Maintenance
                </button>
              </div>
              {user.admin && (
                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      navigate("edit")
                    }}
                  >
                    Edit Equipment Details
                  </button>
                </div>
              )}
              {user.admin && (
                <div className="flex space-x-4">
                  {archived ? (
                    <div>
                      <button className="btn" onClick={editArchived}>
                        Restore
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className="btn" onClick={editArchived}>
                        Archive
                      </button>
                    </div>
                  )}
                  <div>
                    <button className="btn" onClick={destroyClick}>
                      Destroy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
          {/* Card Group - Details and Shared By */}
          <div className="flex flex-col-reverse space-y-6 space-y-reverse items-center lg:flex-row lg:space-y-0 lg:space-x-6 lg:items-start">
            {/* Equipment Shared By Card */}
            <section className="dashboard-card w-80">
              <h3 className="dashboard-heading">Equipment Shared By</h3>
              <div className="flex flex-col min-h-40 justify-between">
                <ul className="list-disc ml-8 mb-4">
                  {equipment.equipment_labs?.map((equipmentLab) => (
                    <li key={`lab-${equipmentLab.lab.id}`}>
                      {equipmentLab.lab.name}
                    </li>
                  ))}
                </ul>
                {user.admin && (
                  <div className="centered">
                    <button
                      className="btn"
                      onClick={() => {
                        navigate(`/equipment/${parseInt(id)}/edit`)
                      }}
                    >
                      Change Lab Access
                    </button>
                  </div>
                )}
              </div>
            </section>
            {/* Equipment Details Card */}
            <section className="dashboard-card w-80">
              <h3 className="dashboard-heading">Equipment Details</h3>
              <div className="flex justify-between items-start">
                <div className="flex flex-col space-y-4">
                  <div className="italic">
                    <div>
                      {equipment.location?.room.building.short_name}{" "}
                      {equipment.location?.room.name}
                    </div>
                    <div>{equipment.location?.name}</div>
                  </div>
                  <div>
                    <div>{equipment.description}</div>
                  </div>
                </div>

                <div>
                  <div>
                    {archived ? (
                      <div className="card-tag bg-purple-400">Archived</div>
                    ) : (
                      <div className="card-tag bg-bluegreen-500 text-gray-100">
                        Active
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* Right Section (Maintenance Lists) */}
        <section className="dashboard-card w-80">
          <ShortMaintenanceList
            maintenanceList={upcomingMaintenance}
            title="Upcoming Maintenance"
          />
          <ShortMaintenanceList
            maintenanceList={completedMaintenance}
            title="Recently Completed Maintenance"
          />
        </section>
      </div>
    </div>
  )
}
