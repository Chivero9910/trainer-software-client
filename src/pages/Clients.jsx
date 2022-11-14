import { NextPlan } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ModalAddRoutine from "../components/ModalAddRoutine"
import NavbarTrainer from "../components/NavbarTrainer"
import {clientsListService} from "../services/clients.services"

function Clients() {

  const [list, setList] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await clientsListService()
      setList(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
        <NavbarTrainer />
        <div>
          {list.map((eachUser) => {
            return(
              <div>
                <Link to={`/clients/${eachUser._id}/planificacion`}>{`${eachUser.name} ${eachUser.lastName}`}</Link>

              </div>
            )
          })}
        </div>

    </div>
  )
}

export default Clients