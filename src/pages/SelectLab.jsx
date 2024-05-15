import { useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import logo from "../assets/lab_fairy_logo.png"
import { SelectLabForm } from "../components/forms/SelectLabForm"
import { updateResearcher } from "../data/authentication"

export const SelectLab = () => {
  const formEl = useRef()
  const { id } = useParams()

  const researcherId = parseInt(id)

  return (
    <div>
      <div className="bg-pink-100 pt-4">
        <h1 className="text-center text-[3rem] font-serif">Welcome to</h1>
        <img className="w-[38rem] mx-auto" src={logo} alt="Lab fairy logo" />
      </div>
      <SelectLabForm
        formEl={formEl}
        researcherId={researcherId}
        title="Almost there! Please select your lab below."
      />
    </div>
  )
}
