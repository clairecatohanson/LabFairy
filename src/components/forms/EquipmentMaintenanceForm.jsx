import { useContext, useEffect, useState } from "react"
import { Select } from "../form-elements/Select"
import { FormLayout } from "../layouts/FormLayout"
import { getEquipment } from "../../data/equipment"
import { getMaintenanceTypes } from "../../data/maintenance"
import { AppContext } from "../../context/AppWrapper"
import { Input } from "../form-elements/Input"
import { Textarea } from "../form-elements/Textarea"
import { useNavigate } from "react-router-dom"

export const EquipmentMaintenanceForm = ({ formEl, submitFunction, title }) => {
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
        <Input id="dateNeeded" label="Date Needed" type="date" />
        {user.admin && (
          <Input id="dateScheduled" label="Date Scheduled" type="date" />
        )}
        <Textarea
          id="notes"
          label="Notes"
          placeholder="e.g. Ask the technician to change the o-rings"
        />
      </form>
      <div>
        <button onClick={submitFunction}>
          {user.admin ? "Schedule" : "Request"}
        </button>
        <button
          onClick={() => {
            navigate("/maintenance")
          }}
        >
          Cancel
        </button>
      </div>
    </FormLayout>
  )
}
