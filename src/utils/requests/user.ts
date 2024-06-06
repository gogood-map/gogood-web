import axios, { AxiosResponse } from 'axios'
import { User } from '../../hooks/AuthProvider/AuthProvider'
import { CreateUser, UserResponse } from '../types/user'

const baseURL = import.meta.env.VITE_BASE_URL

export const getUserById = async (userId: string)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.get(`${baseURL}/usuarios/${userId}`)
}

export const createUser = async (user: CreateUser)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.post(`${baseURL}/usuarios`, user)
}

export const updateUser = async (user: User, userId: number)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.put(`${baseURL}/usuarios/${userId}`, user)
}

export const deleteUser = async (userId: number) => {
  return await axios.delete(`${baseURL}/usuarios/${userId}`)
}

export const getUserByLogin = async (entry: string, password: string)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.post(`${baseURL}/usuarios/login`, {
    entrada: entry,
    senha: password
  })
}
