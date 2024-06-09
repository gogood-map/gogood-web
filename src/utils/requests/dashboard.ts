import axios, { AxiosResponse } from 'axios'
import { DashboardResponse } from '../types/dashboard'

const baseURL = import.meta.env.VITE_BASE_URL

export const getDashboard = async (city: string, suburb: string)
  : Promise<AxiosResponse<DashboardResponse>> => {
  return await axios.get(`${baseURL}/ocorrencias/regiao?cidade=${city}&bairro=${suburb}`)
}

export const getCitySuburb = async (lat: number, lng: number) => {
  return await axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`)
}
