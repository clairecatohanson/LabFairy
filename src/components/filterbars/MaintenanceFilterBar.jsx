import { useEffect, useRef, useState } from "react"
import { Select } from "../form-elements/Select"
import { getEquipment } from "../../data/equipment"
import { getMaintenanceTypes } from "../../data/maintenance"
import { getMaintenanceTickets } from "../../data/equipmentmaintenance"

export const MaintenanceFilterBar = ({ setTickets }) => {
  const statusEl = useRef()
  const equipmentEl = useRef()
  const maintenanceTypeEl = useRef()

  const [equipment, setEquipment] = useState([])
  const [maintenanceTypes, setMaintenanceTypes] = useState([])

  useEffect(() => {
    getEquipment({ query: "restricted=access" }).then((equip) => {
      if (equip) {
        setEquipment(equip)
      }
    })

    getMaintenanceTypes().then((types) => {
      if (types) {
        setMaintenanceTypes(types)
      }
    })
  }, [])

  const statusDropdown = [
    { id: 1, name: "Show All" },
    { id: 2, name: "Requested" },
    { id: 3, name: "Scheduled" },
    { id: 4, name: "Completed" },
  ]

  const filterTickets = () => {
    let query = ""
    const status =
      statusEl.current.options[statusEl.current.selectedIndex].textContent
    const equipmentId = equipmentEl.current.value
    const maintenanceTypeId = maintenanceTypeEl.current.value

    if (status !== "Select status" && status !== "Show All") {
      query += `progress=${status.toLowerCase()}&`
    }
    if (parseInt(equipmentId)) {
      query += `equipment_id=${equipmentId}&`
    }
    if (parseInt(maintenanceTypeId)) {
      query += `maintenance_type_id=${maintenanceTypeId}&`
    }
    query = query.slice(0, -1)

    getMaintenanceTickets({ query: query }).then((filtered) => {
      if (filtered) {
        setTickets(filtered)
      }
    })
  }

  const clearFilters = () => {
    statusEl.current.value = 0
    equipmentEl.current.value = 0
    maintenanceTypeEl.current.value = 0

    getMaintenanceTickets({ query: "progress=active" }).then((all) => {
      if (all) {
        setTickets(all)
      }
    })
  }

  return (
    <div className="min-w-[28rem] bg-pink-100 rounded-lg flex flex-row justify-between items-end py-1">
      <div className="min-w-[20rem] flex flex-col space-y-2">
        <div className="flex space-x-4 ml-2">
          <Select
            id="status"
            defaultOption="Select status"
            dropdownOptions={statusDropdown}
            refEl={statusEl}
            width="w-40"
          />
          <Select
            id="maintenanceType"
            defaultOption="Select type"
            dropdownOptions={maintenanceTypes}
            refEl={maintenanceTypeEl}
            width="w-40"
          />
        </div>
        <div className="ml-2 flex flex-row flex-nowrap space-x-1 items-center">
          <Select
            id="equipment"
            defaultOption="Select equipment"
            dropdownOptions={equipment}
            refEl={equipmentEl}
            width="w-[21rem]"
          />
        </div>
      </div>
      <div className="mr-2 flex flex-col space-y-2 items-end">
        <button
          className="btn bg-purple-500 border-purple-700 shadow-lg text-gray-100"
          onClick={filterTickets}
        >
          Filter
        </button>
        <button
          className="btn bg-purple-300 border-purple-700 shadow-lg text-purple-700"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
