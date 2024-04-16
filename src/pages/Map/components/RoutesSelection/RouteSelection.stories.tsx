import { RoutesResponse, RoutesSelection } from './RoutesSelection'

export default {
    title: 'Components/RoutesSelection',
    component: RoutesSelection,
}

const routes = [
    {
        origem: 'Jardim Paulista',
        destino: 'Centro',
        distancia: 1000,
        duracao: '1 hora',
        horarioChegada: '10:00',
        horarioSaida: '09:00',
        polyline: 'polyline1',
        etapas: [],
        qtdOcorrenciasTotais: 0,

    },
    {
        origem: 'Jardim Paulista',
        destino: 'Centro',
        distancia: 1000,
        duracao: '1 hora',
        horarioChegada: '10:00',
        horarioSaida: '09:00',
        polyline: 'polyline2',
        etapas: [],
        qtdOcorrenciasTotais: 0,
    },
    {
        origem: 'Jardim Paulista',
        destino: 'Centro',
        distancia: 1000,
        duracao: '1 hora',
        horarioChegada: '10:00',
        horarioSaida: '09:00',
        polyline: 'polyline3',
        etapas: [],
        qtdOcorrenciasTotais: 0,
    }
] as RoutesResponse[]

export const Default = () => {
    return <RoutesSelection routes={routes} />
}