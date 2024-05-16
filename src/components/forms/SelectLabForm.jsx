import { useEffect, useState } from "react"
import { Select } from "../form-elements/Select"
import { FormLayout } from "../layouts/FormLayout"
import { getLabs } from "../../data/labs"
import { updateResearcher } from "../../data/authentication"
import { useNavigate } from "react-router-dom"

export const SelectLabForm = ({
  addedClasses = undefined,
  formEl,
  researcherId,
  title,
}) => {
  const [labs, setLabs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getLabs().then((data) => {
      if (data) {
        setLabs(data)
      }
    })
  }, [])

  const submit = async () => {
    const { lab } = formEl.current
    const selectedLab = {
      lab_id: lab.value,
    }

    const response = await updateResearcher(researcherId, selectedLab)
    navigate("/")
  }

  return (
    <FormLayout addedClasses={addedClasses} title={title}>
      <form className="form" ref={formEl}>
        <Select
          id="lab"
          defaultOption="Select lab"
          dropdownOptions={labs}
          width="w-96"
        />
      </form>
      <div className="form-actions">
        <button
          className="btn bg-bluegreen-500 text-gray-100 border-2 border-bluegreen-700"
          onClick={submit}
        >
          Proceed to App
        </button>
      </div>
    </FormLayout>
  )
}
