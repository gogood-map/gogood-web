import axios, { AxiosResponse } from 'axios'
import { AddressResponse, CreateAddress, UpdateAddress } from '../types/address'

const baseURL = import.meta.env.VITE_BASE_URL

export const getAddressByUser = async (userId: number)
  : Promise<AxiosResponse<AddressResponse[]>> => {
  return await axios.get(`${baseURL}/enderecos/${userId}`)
}

export const createAddress = async (address: CreateAddress)
  : Promise<AxiosResponse<AddressResponse>> => {
  return await axios.post(`${baseURL}/enderecos`, address)
}

export const updateAddress = async (addressId: number, address: UpdateAddress)
  : Promise<AxiosResponse<AddressResponse>> => {
  return await axios.put(`${baseURL}/enderecos/${addressId}`, address)
}

export const deleteAddress = async (userId: number, addressId: number) => {
  return await axios.delete(`${baseURL}/enderecos/usuario/${userId}/endereco/${addressId}`)
}
