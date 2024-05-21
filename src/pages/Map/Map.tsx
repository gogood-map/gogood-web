import { useEffect, useState } from 'react'
import { MapComponent } from '../../components/MapComponent/MapComponent'
import { RouteSearchCard } from './components/RouteSearchCard/RouteSearchCard'
import { RoutesResponse } from './components/RoutesSelection/RoutesSelection'
import { toast } from 'react-toastify'
import { RouteDetails } from './components/RouteDetails/RouteDetails'
import axios from 'axios'

export function Map() {
    const [routes, setRoutes] = useState<RoutesResponse[]>()
    const [routesView, setRoutesView] = useState<RoutesResponse[] | undefined>(undefined)
    const [selectedRoute, setSelectedRoute] = useState<RoutesResponse | undefined>(undefined)
    const [searchStatus, setSearchStatus] = useState<'loading' | 'success' | 'error' | 'none'>('none')
    const [visibleInstructions, setVisibleInstructions] = useState(false)
    const [steps, setSteps] = useState<{ instruction: string }[]>([])
    const [travelMode, setTravelMode] = useState<string>('')
    const baseUrl = import.meta.env.VITE_BASE_URL
    const pathParams = new URLSearchParams(window.location.search)

    useEffect(() => {
        toast.info('Dados atualizados até 2° semestre de 2023')
        const idRota = pathParams.get('id-rota')

        if (idRota) {
            axios.get(`${baseUrl}/rotas/compartilhar/${idRota}`)
                .then((response) => {
                    const route = response.data as RoutesResponse[]
                    console.log(route)
                    setRoutesView(route)
                    setRoutes(route)
                    setSearchStatus('success')
                })
                .catch((error) => {
                    console.error(error)
                    toast.error('Erro ao carregar rota')
                })
        }
    }, [])

    const handleSubmitSearch = (origin: string, destination: string, travelMode: string) => {
        setSearchStatus('loading')
        setTravelMode(travelMode)

        axios.get(`${baseUrl}/rotas/${travelMode}?origem=${origin}&destino=${destination}`, {
            timeout: 300000
        }).then((routes) => {
            setRoutesView(routes.data as RoutesResponse[])
            setRoutes(routes.data as RoutesResponse[])
            console.log(routes)
            setSearchStatus('success')
        }).catch((error) => {
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

        const newSteps = route.etapas.map(etapa => {
            return {
                instruction: etapa.instrucao
            }
        })

        setSelectedRoute(route)
        setSteps(newSteps)
        setRoutesView(newRoutes)
        setVisibleInstructions(true)
    }

    const handleClose = () => {
        setRoutesView(undefined)
        setRoutes(undefined)
        setVisibleInstructions(false)
        setSearchStatus('none')
    }

    const handleShare = (route: RoutesResponse | undefined) => {
        if (!route) {
            toast.error('Selecione uma rota para visualizar as instruções')
            return
        }

        axios.post(`${baseUrl}/rotas/compartilhar`, {
            origem: route.origem,
            destino: route.destino,
            tipoTransporte: travelMode.replace('-', '_'),
        }).then((response) => {
            navigator.clipboard.writeText(`${window.location.origin}/mapa?id-rota=${response.data.url}`)
            toast.success('Copiado para a área de transferência')
        }).catch((error) => {
            navigator.clipboard.writeText(`${window.location.origin}/mapa?id-rota=${error.status}`)
            toast.error('Erro ao compartilhar rota')
        })

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
            <RouteDetails visible={visibleInstructions} steps={steps} onShare={() => { handleShare(selectedRoute) }} />
        </>
    )
}
