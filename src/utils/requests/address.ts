import axios, { AxiosResponse } from 'axios'
import { Address } from '../../pages/Profile/components/AddressList/AddressList'
import { AddressResponse, CreateAddress } from '../types/address'

const baseURL = import.meta.env.VITE_BASE_URL

export const getAddressByUser = async (userId: string): Promise<AxiosResponse<AddressResponse[]>> => {
  return await axios.get(`${baseURL}/address/${userId}`)
}

export const createAddress = async (address: CreateAddress): Promise<AxiosResponse<AddressResponse>> => {
  return await axios.post(`${baseURL}/address`, address)
}

export const updateAddress = async (address: Address, addressId: number): Promise<AxiosResponse<AddressResponse>> => {
  return await axios.put(`${baseURL}/address/${addressId}`, address)
}

export const deleteAddress = async (addressId: number) => {
  return await axios.delete(`${baseURL}/address/${addressId}`)
}
