import { useRef } from "react"
import { Select } from "../form-elements/Select"
import { Input } from "../form-elements/Input"
import { getInventoryItems } from "../../data/inventoryitems"

export const InventoryFilterBar = ({ inventoryId, setInventoryItems }) => {
  const statusEl = useRef(null)
  const nameEl = useRef(null)
  const buttonRef = useRef(null)

  const statusDropdown = [
    { id: 1, name: "Show All" },
    { id: 2, name: "In Stock" },
    { id: 3, name: "Out of Stock" },
  ]

  const filterItems = () => {
    let query = ""
    const status =
      statusEl.current.options[statusEl.current.selectedIndex].textContent
    const search = nameEl.current.value

    if (status === "In Stock" || status === "Out of Stock") {
      query += "status=available&"
    }
    if (status === "Out of Stock") {
      query += "status=depleted&"
    }
    if (search) {
      query += `name=${search}&`
    }
    query = query.slice(0, -1)

    getInventoryItems({ inventory_id: inventoryId, query: query }).then(
      (filtered) => {
        if (filtered) {
          setInventoryItems(filtered)
        }
      }
    )
  }

  const clearFilters = () => {
    statusEl.current.value = 0
    nameEl.current.value = ""

    getInventoryItems({ inventory_id: inventoryId }).then((all) => {
      if (all) {
        setInventoryItems(all)
      }
    })
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      filterItems()
    }
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
        </div>
        <div className="ml-2 flex flex-row flex-nowrap space-x-1 items-center">
          <i className="fa-solid fa-magnifying-glass"></i>
          <Input
            id="search"
            onKeyPressFunction={handleEnter}
            placeholder="Item name"
            refEl={nameEl}
            type="text"
            width="w-80"
          />
        </div>
      </div>
      <div className="mr-2 flex flex-col space-y-2 items-end">
        <button
          className="btn bg-purple-500 border-purple-700 shadow-lg text-gray-100"
          onClick={filterItems}
        >
          Filter
        </button>
        <button
          className="btn bg-purple-300 border-purple-700 shadow-lg text-purple-700"
          onClick={clearFilters}
          ref={buttonRef}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
