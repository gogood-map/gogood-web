import axios from 'axios'
import { Address } from '../../pages/Profile/components/AddressList/AddressList'

const baseURL = import.meta.env.VITE_BASE_URL

export const getAddressByUser = async (userId: string) => {
  return await axios.get(`${baseURL}/address/${userId}`)
}

export const createAddress = async (address: Address) => {
  return await axios.post(`${baseURL}/address`, address)
}

export const updateAddress = async (address: Address, addressId: number) => {
  return await axios.put(`${baseURL}/address/${addressId}`, address)
}

export const deleteAddress = async (addressId: number) => {
  return await axios.delete(`${baseURL}/address/${addressId}`)
}
