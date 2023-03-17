import axios from 'axios'
import React from 'react'

type Props = {}



const USER_BASE_URL ="https://localhost:8080/users"
export default function userService({}: Props) {
    
    const getAllUser =() => {
        return(axios.get(USER_BASE_URL+"/"+"getAllUser"))
    }

    const userLogin= () =>{
      axios.post(USER_BASE_URL+"/"+"login")
    }
  return (
    getAllUser(),
    userLogin()
  )
}

function getAllUser() {
    throw new Error('Function not implemented.')
}
