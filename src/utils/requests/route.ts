import axios, { AxiosResponse } from 'axios'
import { RouteResponse } from '../types/route'

const baseURL = import.meta.env.VITE_BASE_URL

export const getRoute = async (
  origin: string, destination: string, travelMode: string
): Promise<AxiosResponse<RouteResponse[]>> => {
  return await axios.get(`${baseURL}/rotas/${travelMode}?origem=${origin}&destino=${destination}`, {
    timeout: 300000
  })
}

export const createSharedRoute = async (
  origin: string, destination: string, travelMode: string
): Promise<AxiosResponse<string>> => {
  return await axios.post(`${baseURL}/rotas/compartilhar`, {
    origem: origin,
    destino: destination,
    tipoTransporte: travelMode
  })
}

export const getSharedRoute = async (routeId: string) => {
  return await axios.get(`${baseURL}/rotas/compartilhar/${routeId}`)
}
