import { useEffect, useState } from "react"
import { FormLayout } from "../layouts/FormLayout"
import { Input } from "../form-elements/Input"
import { Select } from "../form-elements/Select"
import { Textarea } from "../form-elements/Textarea"
import { getLabs } from "../../data/labs"
import { getBuildings, getRooms, getLocations } from "../../data/locations"

export const EquipmentForm = ({ formEl, submitFunction, title, router }) => {
  const [labs, setLabs] = useState([])
  const [buildings, setBuildings] = useState([])
  const [rooms, setRooms] = useState([])
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

  return (
    <></>
    // <FormLayout title={title}>
    //   <form ref={formEl}>
    //     <Input
    //       id="equipment-name"
    //       label="Equipment Name"
    //       placeholder="e.g. Ultracentrifuge"
    //       type="text"
    //     />
    //     <div>
    //       <h4>Location</h4>
    //       {/* <Select
    //         id="building"
    //         defaultOption="Select building"
    //         dropdownOptions={buildings}
    //         label="Building"
    //       />
    //       <Select
    //         id="room"
    //         defaultOption="Select room"
    //         dropdownOptions={rooms}
    //         label="Room"
    //       />
    //       <Select
    //         id="location"
    //         defaultOption="Select location"
    //         dropdownOptions={locations}
    //         label="Location"
    //       /> */}
    //     </div>
    //     <Textarea
    //       id="description"
    //       label="Description"
    //       placeholder="e.g. High-speed centrifuge for pelleting cell membrane"
    //     />
    //     <Input
    //       id="equipment-labs"
    //       checkboxes={labs}
    //       name="labs"
    //       type="checkbox"
    //     />
    //   </form>
    //   <div>
    //     <button onClick={submitFunction}>Create</button>
    //     <button
    //       onClick={() => {
    //         router.back()
    //       }}
    //     >
    //       Cancel
    //     </button>
    //   </div>
    // </FormLayout>
  )
}
