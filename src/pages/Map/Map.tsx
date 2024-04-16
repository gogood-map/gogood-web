import { useState } from 'react'
import { MapComponent } from './components/MapComponent/MapComponent'
import { RouteSearchCard } from './components/RouteSearchCard/RouteSearchCard'
import { RoutesResponse } from './components/RoutesSelection/RoutesSelection'

export function Map() {
    const [routes, setRoutes] = useState<RoutesResponse[]>()
    const [searchStatus, setSearchStatus] = useState<'loading' | 'success' | 'error' | 'none'>('none')

    const handleSubmitSearch = (origin: string, destination: string, travelMode: string) => {
        setSearchStatus('loading')
        consultaRota(origin, destination, travelMode)
            .then((rotas) => {
                setRoutes(rotas)
                console.log(rotas)
                setSearchStatus('success')
            })
            .catch((error) => {
                console.error(error)
                setSearchStatus('error')
            })
    }

    const consultaRota = async (origin: string, destination: string, travelMode: string) => {
        const response = await fetch(`https://gogood.brazilsouth.cloudapp.azure.com/rotas/${travelMode}?origem=${origin}&destino=${destination}`)
        if (!response.ok) {
            return Promise.reject('Erro ao consultar rotas')
        }   
        const json = await response.json()

        return await json as RoutesResponse[]
    }
    return (
        <>
            <MapComponent routes={routes} />
            <RouteSearchCard onSubmitSearch={handleSubmitSearch} routes={routes} searchStatus={searchStatus} />
        </>
    )
}