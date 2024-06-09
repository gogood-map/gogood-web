import axios, { AxiosResponse } from 'axios'
import { CreateHistory, HistoryResponse } from '../types/history'

const baseURL = import.meta.env.VITE_BASE_URL

export const getHistoryByUser = async (userId: number)
  : Promise<AxiosResponse<HistoryResponse[]>> => {
  return await axios.get(`${baseURL}/historico-rota/${userId}`)
}

export const createHistory = async (history: CreateHistory)
  : Promise<AxiosResponse<HistoryResponse>> => {
  return await axios.post(`${baseURL}/historico-rota`, history)
}

export const deleteHistoryByUser = async (userId: number) => {
  return await axios.delete(`${baseURL}/historico-rota/${userId}`)
}
