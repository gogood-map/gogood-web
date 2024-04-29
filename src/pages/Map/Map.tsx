import { useState } from 'react'
import { MapComponent } from './components/MapComponent/MapComponent'
import { RouteSearchCard } from './components/RouteSearchCard/RouteSearchCard'
import { RoutesResponse } from './components/RoutesSelection/RoutesSelection'
import axios from 'axios'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'

export function Map() {
    const [routes, setRoutes] = useState<RoutesResponse[]>()
    const [searchStatus, setSearchStatus] = useState<'loading' | 'success' | 'error' | 'none'>('none')
    const { user } = useAuth()

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
        const response = await axios.get(`https://gogood.brazilsouth.cloudapp.azure.com/rotas/${travelMode}?origem=${origin}&destino=${destination}`, {
            timeout: 90000
        })

        if (response.status !== 200) {
            return Promise.reject('Erro ao consultar rotas')
        }

        return response.data as RoutesResponse[]
    }
    return (
        <>
            <MapComponent routes={routes} />
            {user &&
                <RouteSearchCard onSubmitSearch={handleSubmitSearch} routes={routes} searchStatus={searchStatus} />
            }
        </>
    )
}
