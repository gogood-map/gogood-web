import axios from 'axios'
import { User } from '../../hooks/AuthProvider/AuthProvider'

const baseURL = import.meta.env.VITE_BASE_URL

export const getUserById = async (userId: string) => {
  return await axios.get(`${baseURL}/user/${userId}`)
}

export const createUser = async (user: User) => {
  return await axios.post(`${baseURL}/user`, user)
}

export const updateUser = async (user: User, userId: number) => {
  return await axios.put(`${baseURL}/user/${userId}`, user)
}

export const deleteUser = async (userId: number) => {
  return await axios.delete(`${baseURL}/user/${userId}`)
}
