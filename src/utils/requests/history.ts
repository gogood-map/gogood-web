import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

export const getHistoryByUser = async (userId: string) => {
  return await axios.get(`${baseURL}/history/${userId}`)
}

export const createHistory = async (history: History) => {
  return await axios.post(`${baseURL}/history`, history)
}

export const deleteHistoryByUser = async (userId: string) => {
  return await axios.delete(`${baseURL}/history/${userId}`)
}
