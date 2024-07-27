import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = '/users'

const register = async (credentials) =>{
  const response = await axios.post(`${baseURL}/register` ,credentials ) ;
  return response.data 
}

const forgotPassword = async (email) =>{
  const response = await axios.post(`${baseURL}/recover` ,{email} ) ;
  return response.data 
}

const login = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials)
  return response.data
}

const logout = async () => {
  await axios.post(`${baseURL}/logout`, undefined, getAuthHeader())
}

const update = async (user) => {
  const response = await axios.patch(
    `${baseURL}/me`,
    {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
      photo: user.photo
    },
    getAuthHeader()
  )
  return response.data
}

const reset = async (token) => {
  const response = await axios.get(`${baseURL}/reset/${token}`)
  return response.data
}

const changePassword = async (token, password) => {
  const response = await axios.post(`${baseURL}/reset/${token}`, { password })
  return response.data
}

const createCompaign = async (data) => {
  console.log(data);
  const response = await axios.post('/compaign', data,getAuthHeader())
  return response.data
}

const usersService = { register, login, logout, update, forgotPassword, reset, changePassword, createCompaign }
export default usersService
