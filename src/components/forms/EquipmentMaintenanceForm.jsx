import { useContext, useEffect, useState } from "react"
import { Select } from "../form-elements/Select"
import { FormLayout } from "../layouts/FormLayout"
import { getEquipment } from "../../data/equipment"
import { getMaintenanceTypes } from "../../data/maintenance"
import { AppContext } from "../../context/AppWrapper"
import { Input } from "../form-elements/Input"
import { useNavigate } from "react-router-dom"

export const EquipmentMaintenanceForm = ({
  formEl,
  staticJSX = undefined,
  submitFunction,
  deleteFunction = undefined,
  updateFunction = undefined,
  title,
}) => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  const [equipmentList, setEquipmentList] = useState([])
  const [maintenanceTypes, setMaintenanceTypes] = useState([])

  useEffect(() => {
    getEquipment({ query: "restricted=access" }).then((equipmentData) => {
      if (equipmentData) {
        setEquipmentList(equipmentData)
      }
    })

    getMaintenanceTypes().then((maintenanceData) => {
      if (maintenanceData) {
        setMaintenanceTypes(maintenanceData)
      }
    })
  }, [])

  return (
    <FormLayout title={title}>
      <form ref={formEl}>
        {staticJSX && staticJSX}
        {title !== "Edit Equipment Maintenance" && (
          <>
            <Select
              id="equipment"
              defaultOption="Select equipment"
              dropdownOptions={equipmentList}
              label="Equipment"
            />
            <Select
              id="maintenanceType"
              defaultOption="Select maintenance type"
              dropdownOptions={maintenanceTypes}
              label="Maintenance Type"
            />
          </>
        )}
        <Input id="dateNeeded" label="Date Needed" type="date" />
        {user.admin && (
          <Input id="dateScheduled" label="Date Scheduled" type="date" />
        )}
      </form>
      <div>
        {title === "Schedule Equipment Maintenance" ? (
          <button className="btn" onClick={submitFunction}>
            {user.admin ? "Schedule" : "Request"}
          </button>
        ) : (
          <button className="btn" onClick={submitFunction}>
            Update
          </button>
        )}
        {title === "Edit Equipment Maintenance" && (
          <>
            <button className="btn" onClick={updateFunction}>
              Cancel Scheduled Maintenance
            </button>
            <button className="btn" onClick={deleteFunction}>
              Delete Ticket
            </button>
          </>
        )}
        <button
          className="btn"
          onClick={() => {
            navigate("/maintenance")
          }}
        >
          Go Back
        </button>
      </div>
    </FormLayout>
  )
}
