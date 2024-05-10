import { useRef } from "react"
import { Select } from "../form-elements/Select"
import { Input } from "../form-elements/Input"
import { getEquipment } from "../../data/equipment"

export const EquipmentFilterBar = ({ labs, setEquipment }) => {
  const statusEl = useRef()
  const labEl = useRef()
  const nameEl = useRef()

  const statusDropdown = [
    { id: 1, name: "Active" },
    { id: 2, name: "Archived" },
  ]

  const filterEquipment = () => {
    let query = ""
    const status =
      statusEl.current.options[statusEl.current.selectedIndex].textContent
    const lab_id = labEl.current.value
    const search = nameEl.current.value

    if (status === "Archived" || status === "Active") {
      query += `status=${status.toLowerCase()}&`
    }
    if (parseInt(lab_id)) {
      query += `lab_id=${lab_id}&`
    }
    if (search) {
      query += `name=${search}&`
    }
    query = query.slice(0, -1)

    getEquipment({ query: query }).then((filtered) => {
      if (filtered) {
        setEquipment(filtered)
      }
    })
  }

  const clearFilters = () => {
    statusEl.current.value = 0
    labEl.current.value = 0
    nameEl.current.value = ""

    getEquipment().then((all) => {
      if (all) {
        setEquipment(all)
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
            id="lab"
            defaultOption="Select lab"
            dropdownOptions={labs}
            refEl={labEl}
            width="w-40"
          />
        </div>
        <div className="ml-2 flex flex-row flex-nowrap space-x-1 items-center">
          <i className="fa-solid fa-magnifying-glass"></i>
          <Input
            id="search"
            placeholder="Equipment name"
            refEl={nameEl}
            type="text"
            width="w-80"
          />
        </div>
      </div>
      <div className="mr-2 flex flex-col space-y-2 items-end">
        <button
          className="btn bg-purple-500 border-purple-700 shadow-lg text-gray-100"
          onClick={filterEquipment}
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
