import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { profileDetailsService } from "../services/profile.services"

function IsUser(props) {
    const [data, setData] = useState([])
  
    useEffect(() => {
      getData()
    }, [])
  
    const getData = async() => {
      const response = await profileDetailsService()
      setData(response.data)
      console.log(response.data);
    }

    if(data.isTrainer === false) {
        return props.children
    } else {
        return <Navigate to="/clients" />
    }
  
      
  }

export default IsUser