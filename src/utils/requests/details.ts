import axios, {AxiosResponse} from 'axios'
import { DetailResponse } from '../types/details'
const baseUrl = import.meta.env.VITE_BASE_URL


export const getDetails = async(lat:number, lng:number)
    : Promise<AxiosResponse<DetailResponse>>=>{
        return await axios.get(`${baseUrl}/consultar/buscaOcorrencia/${lat}/${lng}`
)}