import { useContext, useEffect, useState } from "react"
import { Select } from "../form-elements/Select"
import { FormLayout } from "../layouts/FormLayout"
import { getEquipment } from "../../data/equipment"
import { getMaintenanceTypes } from "../../data/maintenance"
import { AppContext } from "../../context/AppWrapper"
import { Input } from "../form-elements/Input"
import { useNavigate } from "react-router-dom"

export const EquipmentMaintenanceForm = ({
  deleteFunction = undefined,
  formEl,
  heading,
  id = undefined,
  staticJSX = undefined,
  submitFunction,
  title,
  updateFunction = undefined,
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
      <form className="form" ref={formEl}>
        <h3 className="form-heading">{heading}</h3>
        {staticJSX && staticJSX}
        {!id && (
          <>
            <Select
              id="equipment"
              defaultOption="Select equipment"
              dropdownOptions={equipmentList}
              width="w-96"
            />
            <Select
              id="maintenanceType"
              defaultOption="Select maintenance type"
              dropdownOptions={maintenanceTypes}
              width="w-96"
            />
          </>
        )}
        <Input id="dateNeeded" label="Date Needed" type="date" />
        {user.admin && (
          <Input id="dateScheduled" label="Date Scheduled" type="date" />
        )}
      </form>
      <div className="form-actions">
        {!id ? (
          <button className="btn" onClick={submitFunction}>
            {user.admin ? "Schedule" : "Request"}
          </button>
        ) : (
          <button className="btn" onClick={submitFunction}>
            Update
          </button>
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
      {id && (
        <div className="form-actions">
          <button className="btn" onClick={updateFunction}>
            Cancel Maintenance
          </button>
          <button className="btn" onClick={deleteFunction}>
            Cancel and Delete
          </button>
        </div>
      )}
    </FormLayout>
  )
}
