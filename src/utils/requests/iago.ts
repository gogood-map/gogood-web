import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

export const getIAResponse = async (prompt: string) => {
  return await axios.post(`${baseURL}/iago`, {
    prompt: prompt
  })
}
