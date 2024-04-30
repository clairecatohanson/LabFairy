import { useEffect, useState } from "react"
import { FormLayout } from "../layouts/FormLayout"
import { Input } from "../form-elements/Input"
import { Select } from "../form-elements/Select"
import { Textarea } from "../form-elements/Textarea"
import { getLabs } from "../../data/labs"
import { getBuildings, getRooms, getLocations } from "../../data/locations"

export const EquipmentForm = ({
  formEl,
  cancelFunction,
  submitFunction,
  title,
}) => {
  const [labs, setLabs] = useState([])
  const [buildings, setBuildings] = useState([])
  const [building, setBuilding] = useState(0)
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState(0)
  const [locations, setLocations] = useState([])

  useEffect(() => {
    getLabs().then((labData) => {
      if (labData) {
        setLabs(labData)
      }
    })
    getBuildings().then((buildingData) => {
      if (buildingData) {
        setBuildings(buildingData)
      }
    })
    getRooms().then((roomData) => {
      if (roomData) {
        setRooms(roomData)
      }
    })
    getLocations().then((locationData) => {
      if (locationData) {
        setLocations(locationData)
      }
    })
  }, [])

  useEffect(() => {
    if (building) {
      const buildingQuery = `building=${building}`
      getRooms(buildingQuery).then((roomData) => {
        if (roomData) {
          setRooms(roomData)
        }
      })
    }
  }, [building])

  useEffect(() => {
    if (room) {
      const roomQuery = `room=${room}`
      getLocations(roomQuery).then((locationData) => {
        if (locationData) {
          setLocations(locationData)
        }
      })
    }
    if (room === 0) {
      getLocations().then((locationData) => {
        if (locationData) {
          setLocations(locationData)
        }
      })
    }
  }, [room, title])

  return (
    <FormLayout title={title}>
      <form ref={formEl}>
        <Input
          id="name"
          label="Equipment Name"
          placeholder="e.g. Ultracentrifuge"
          type="text"
        />
        <fieldset className="form-section">
          {title === "Add New Equipment" && (
            <>
              <div className="form-fieldset">
                <label htmlFor="building" className="element-label">
                  Building
                </label>
                <div className="select-container">
                  <select
                    id="building"
                    onChange={(e) => {
                      setBuilding(parseInt(e.target.value))
                    }}
                  >
                    <option value="0">Select building</option>
                    {buildings.map((building) => (
                      <option key={building.id} value={building.id}>
                        {building.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-fieldset">
                <label htmlFor="room" className="element-label">
                  Room
                </label>
                <div className="select-container">
                  <select
                    id="room"
                    onChange={(e) => {
                      setRoom(parseInt(e.target.value))
                    }}
                  >
                    <option value="0">Select room</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Select
                id="location"
                defaultOption="Select location"
                dropdownOptions={locations}
                label="Location"
              />
            </>
          )}
        </fieldset>
        <Textarea
          id="description"
          label="Description"
          placeholder="e.g. High-speed centrifuge for pelleting cell membrane"
        />
        <Input
          id="labs"
          checkboxes={labs}
          label="Labs"
          name="labs"
          type="checkbox"
        />
      </form>
      <div className="btns-container">
        <button onClick={submitFunction} className="btn">
          {title === "Add New Equipment" ? "Create" : "Update"}
        </button>
        {title === "Add New Equipment" ? (
          <button onClick={cancelFunction} className="btn">
            Cancel
          </button>
        ) : (
          <button onClick={cancelFunction} className="btn">
            Cancel
          </button>
        )}
      </div>
    </FormLayout>
  )
}
