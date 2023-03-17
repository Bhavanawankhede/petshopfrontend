import axios from 'axios'
import React from 'react'
import authHeader from './auth-header';

type Props = {}



const USER_BASE_URL ="https://localhost:8080/users"
export default function userService({}: Props) {
    
    const getAllUser =() => {
        return(axios.get(USER_BASE_URL+"/"+"getAllUser"))
    }

    const userLogin= () =>{
      axios.post(USER_BASE_URL+"/"+"login")
    }

    const getPublicContent= () =>{
        return axios.get(USER_BASE_URL + 'all');
      }

    const getUserBoard=() => {
        return axios.get(USER_BASE_URL + 'user', { headers: authHeader() });
      }
    
     
    const getAdminBoard=()=> {
        return axios.get(USER_BASE_URL + 'admin', { headers: authHeader() });
      }
  return (
    getAllUser(),
    userLogin(),
    getPublicContent(),
    getUserBoard(),
    getAdminBoard

  )
}

function getAllUser() {
    throw new Error('Function not implemented.')
}
