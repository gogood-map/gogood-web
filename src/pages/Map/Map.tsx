import { useEffect, useState } from 'react'
import { MapComponent } from '../../components/MapComponent/MapComponent'
import { RouteSearchCard } from './components/RouteSearchCard/RouteSearchCard'
import { RoutesResponse } from './components/RoutesSelection/RoutesSelection'
import { toast } from 'react-toastify'
import { RouteDetails } from './components/RouteDetails/RouteDetails'
import { createSharedRoute, getRoute, getSharedRoute } from '../../utils/requests/route'
import { createHistory } from '../../utils/requests/history'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'

export function Map() {
    const [routes, setRoutes] = useState<RoutesResponse[]>()
    const [routesView, setRoutesView] = useState<RoutesResponse[] | undefined>(undefined)
    const [selectedRoute, setSelectedRoute] = useState<RoutesResponse | undefined>(undefined)
    const [searchStatus, setSearchStatus] = useState<'loading' | 'success' | 'error' | 'none'>('none')
    const [visibleInstructions, setVisibleInstructions] = useState(false)
    const [steps, setSteps] = useState<{ instruction: string }[]>([])
    const [travelMode, setTravelMode] = useState<string>('')
    const { user } = useAuth()
    const pathParams = new URLSearchParams(window.location.search)

    useEffect(() => {
        toast.info('Dados atualizados até 2° semestre de 2023')
        const routeId = pathParams.get('id-rota')

        if (routeId) {
            getSharedRoute(routeId)
                .then((response) => {
                    const route = response.data as RoutesResponse[]
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
        if (!user) {
            toast.error('Faça login para realizar a busca')
            return
        }
        setSearchStatus('loading')
        setTravelMode(travelMode)

        getRoute(origin, destination, travelMode).then((routes) => {
            setRoutesView(routes.data as RoutesResponse[])
            setRoutes(routes.data as RoutesResponse[])
            setSearchStatus('success')

            createHistory({
                origem: origin,
                destino: destination,
                meio_locomocao: travelMode,
                id_usuario: user?.id
            }).catch((error) => {
                console.error(error)
            })

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

    const handleCancelSelectRoute = () => {
        setSelectedRoute(undefined)
        setSteps([])
        setRoutesView(routes)
        setVisibleInstructions(false)
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

        createSharedRoute(
            route.origem,
            route.destino,
            travelMode.replace('-', '_')
        ).then((response) => {
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
                onCancelSelect={handleCancelSelectRoute}
                onClose={handleClose}
                routes={routes}
                searchStatus={searchStatus}
            />
            <RouteDetails visible={visibleInstructions} steps={steps} onShare={() => { handleShare(selectedRoute) }} />
        </>
    )
}
