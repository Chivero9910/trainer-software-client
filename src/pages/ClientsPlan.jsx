import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ModalAddRoutine from "../components/ModalAddRoutine"
import NavbarTrainer from "../components/NavbarTrainer"
import {clientDetailsService} from "../services/clients.services"

function ClientsDetails() {
    const {clientId} = useParams()
    const [list, setList] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await clientDetailsService(clientId)
            setList(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div>
        <NavbarTrainer />
        <ModalAddRoutine />
    </div>
  )
}

export default ClientsDetails