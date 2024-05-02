import { useEffect, useState } from "react"
import { FormLayout } from "../layouts/FormLayout"
import { Input } from "../form-elements/Input"
import { Select } from "../form-elements/Select"
import { Textarea } from "../form-elements/Textarea"
import { getLabs } from "../../data/labs"
import { getBuildings, getRooms, getLocations } from "../../data/locations"

export const EquipmentForm = ({
  formEl,
  heading,
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
      <form className="form" ref={formEl}>
        <h3 className="form-heading">{heading}</h3>
        <Input
          id="name"
          placeholder="Equipment Name"
          type="text"
          width="w-96"
        />
        {title === "Add New Equipment" && (
          <fieldset className="flex flex-col space-y-2 pt-2 pb-6">
            <h4 className="centered font-bold text-xl text-pink-600 mb-2">
              Location
            </h4>
            <select
              className="form-select-element w-96"
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
            <select
              className="form-select-element w-96"
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
            <Select
              id="location"
              defaultOption="Select location"
              dropdownOptions={locations}
              width="w-96"
            />
          </fieldset>
        )}
        <Textarea
          id="description"
          placeholder="Description"
          width="w-96"
          height="h-40"
        />
        <Input
          id="labs"
          checkboxes={labs}
          heading="Labs With Access"
          name="labs"
          type="checkbox"
          width="w-96"
        />
      </form>
      <div className="form-actions">
        <button className="btn" onClick={submitFunction}>
          {title === "Add New Equipment" ? "Create" : "Update"}
        </button>
        {title === "Add New Equipment" ? (
          <button className="btn" onClick={cancelFunction}>
            Cancel
          </button>
        ) : (
          <button className="btn" onClick={cancelFunction}>
            Cancel
          </button>
        )}
      </div>
    </FormLayout>
  )
}
