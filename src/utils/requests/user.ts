import axios, { AxiosResponse } from 'axios'
import { CreateGoogleUser, CreateUser, UpdateUser, UserResponse } from '../types/user'

const baseURL = import.meta.env.VITE_BASE_URL

export const getUserById = async (userId: string)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.get(`${baseURL}/usuarios/${userId}`)
}

export const createUser = async (user: CreateUser)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.post(`${baseURL}/usuarios/cadastro`, user)
}

export const createGoogleUser = async (user: CreateGoogleUser)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.post(`${baseURL}/usuarios/cadastro-google`, user)
}

export const updateUser = async (userId: number, user: UpdateUser)
  : Promise<AxiosResponse<void>> => {
  return await axios.put(`${baseURL}/usuarios/${userId}`, user)
}

export const deleteUser = async (userId: number) => {
  return await axios.delete(`${baseURL}/usuarios/${userId}`)
}

export const getUserByLogin = async (email: string, password: string)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.post(`${baseURL}/usuarios/login`, {
    email,
    senha: password
  })
}

export const getGoogleUserByLogin = async (email: string, googleId: string)
  : Promise<AxiosResponse<UserResponse>> => {
  return await axios.post(`${baseURL}/usuarios/login-google`, {
    email,
    google_id: googleId
  })
}
