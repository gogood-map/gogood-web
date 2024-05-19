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
    const [searchStatus, setSearchStatus] = useState<'loading' | 'success' | 'error' | 'none'>('none')
    const [visibleInstructions, setVisibleInstructions] = useState(false)
    const [steps, setSteps] = useState<{ instruction: string }[]>([])
    // const [travelMode, setTravelMode] = useState<string>('')
    const baseUrl = import.meta.env.VITE_BASE_URL

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

        const newSteps = route.etapas.map(etapa => {
            return {
                instruction: etapa.instrucao
            }
        })

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

    const handleConfirmRoute = (route: RoutesResponse) => {
        if (!route) {
            toast.error('Selecione uma rota para visualizar as instruções')
            return
        }

        axios.post(`${baseUrl}/rotas/compartilhar`, {
            origem: route.origem,
            destino: route.destino,
            // tipoTransporte: route.tipoTransporte
        }).then((response) => {
            navigator.clipboard.writeText(`${window.location.origin}/mapa?id-rota=${response.data}`)
            toast.success('Rota compartilhada com sucesso')
        }).catch((error) => {
            navigator.clipboard.writeText(`${window.location.origin}/mapa?id-rota=${error}`)
            toast.error('Erro ao compartilhar rota')
        })

    }

    const consultaRota = async (origin: string, destination: string, travelMode: string) => {
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
                onConfirmRoute={handleConfirmRoute}
                onClose={handleClose}
                routes={routes}
                searchStatus={searchStatus}
            />
            <RouteDetails visible={visibleInstructions} steps={steps} />
        </>
    )
}
