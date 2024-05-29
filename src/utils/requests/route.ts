import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

export const getRoute = async (origin: string, destination: string, travelMode: string) => {
  return await axios.get(`${baseURL}/rotas/${travelMode}?origem=${origin}&destino=${destination}`, {
    timeout: 300000
  })
}
