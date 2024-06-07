import axios, { AxiosResponse } from 'axios'
import { HistoryResponse } from '../types/history'

const baseURL = import.meta.env.VITE_BASE_URL

export const getHistoryByUser = async (userId: string)
  : Promise<AxiosResponse<HistoryResponse[]>> => {
  return await axios.get(`${baseURL}/history/${userId}`)
}

export const createHistory = async (history: History)
  : Promise<AxiosResponse<HistoryResponse>> => {
  return await axios.post(`${baseURL}/history`, history)
}

export const deleteHistoryByUser = async (userId: number) => {
  return await axios.delete(`${baseURL}/history/${userId}`)
}
