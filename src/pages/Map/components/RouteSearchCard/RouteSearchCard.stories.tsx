import { RoutesResponse } from '../RoutesSelection/RoutesSelection'
import { RouteSearchCard } from './RouteSearchCard'

export default {
    title: 'Components/RouteSearchCard',
    component: RouteSearchCard,
}

const routes = [
    {
        origem: 'origem',
        destino: 'destino',
        distancia: 10,
        duracao: '1 hora 30 minutos',
        horarioSaida: '08:00',
        horarioChegada: '09:30',
        qtdOcorrenciasTotais: 1,
        polyline: 'polyline',
        etapas: [
            {
                instrucao: 'instrucao'
            }
        ]
    },
    {
        origem: 'origem',
        destino: 'destino',
        distancia: 10,
        duracao: '1 hora 30 minutos',
        horarioSaida: '08:00',
        horarioChegada: '09:30',
        qtdOcorrenciasTotais: 1,
        polyline: 'polyline',
        etapas: [
            {
                instrucao: 'instrucao'
            }
        ]
    }
] as RoutesResponse[]

const onSubmit = (origin: string, destination: string, travelMode: string) => {
    console.log(origin, destination, travelMode)
}

export const Loading = () => {
    return <RouteSearchCard onSubmitSearchRoute={onSubmit} searchStatus='loading'  />
}

export const Success = () => {
    return <RouteSearchCard onSubmitSearchRoute={onSubmit} searchStatus='success' routes={routes} />
}