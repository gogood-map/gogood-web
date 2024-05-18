import { useEffect, useState } from 'react'
import { MapComponent } from '../../components/MapComponent/MapComponent'
import { RouteSearchCard } from './components/RouteSearchCard/RouteSearchCard'
import { RoutesResponse } from './components/RoutesSelection/RoutesSelection'
import axios from 'axios'
import { toast } from 'react-toastify'

export function Map() {
    const [routes, setRoutes] = useState<RoutesResponse[]>()
    const [routesView, setRoutesView] = useState<RoutesResponse[] | undefined>(undefined)
    const [searchStatus, setSearchStatus] = useState<'loading' | 'success' | 'error' | 'none'>('none')

    useEffect(() => {
        toast.info('Dados atualizados até 2° semestre de 2023')
    }, [])

    const handleSubmitSearch = (origin: string, destination: string, travelMode: string) => {
        setSearchStatus('loading')
        consultaRota(origin, destination, travelMode)
            .then((routes) => {
                setRoutesView(routes)
                setRoutes(routes)
                console.log(routes)
                setSearchStatus('success')
            })
            .catch((error) => {
                console.error(error)
                setSearchStatus('error')
            })
    }

    const handleSelectRoute = (route: RoutesResponse) => {
        const newRoutes = routes?.map(r => {
            return {
                ...r,
                polyline: r === route ? r.polyline : ''
            }
        })

        setRoutesView(newRoutes)
    }

    const handleClose = () => {
        setRoutesView(undefined)
        setRoutes(undefined)
        setSearchStatus('none')
    }

    const consultaRota = async (origin: string, destination: string, travelMode: string) => {
        const baseUrl = import.meta.env.VITE_BASE_URL
        const response = await axios.get(`${baseUrl}/rotas/${travelMode}?origem=${origin}&destino=${destination}`, {
            timeout: 300000
        })

        if (response.status !== 200) {
            return Promise.reject('Erro ao consultar rotas')
        }

        return response.data as RoutesResponse[]
    }

    return (
        <>
            <MapComponent routes={routesView} />
            <RouteSearchCard
                onSubmitSearch={handleSubmitSearch}
                onSelectRoute={handleSelectRoute}
                onClose={handleClose}
                routes={routes}
                searchStatus={searchStatus}
            />
        </>
    )
}
