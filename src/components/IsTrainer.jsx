import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { profileDetailsService } from "../services/profile.services"

function IsTrainer(props) {

    const [data, setData] = useState([])
    const navigate = useNavigate()
  
    useEffect(() => {
      getData()

    }, [])
  
    const getData = async() => {
      const response = await profileDetailsService()
      setData(response.data)
    }

    if(data.isTrainer === true) {
        return props.children
    } 
    if(data.isTrainer === false) {
        navigate("/planificacion")
    }
  
      
  }

export default IsTrainer