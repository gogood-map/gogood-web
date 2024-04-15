import { designTokens } from 'design-tokens'
import { createContext, useContext, useState } from 'react'
import { RouteForm } from '../RouteForm/RouteForm'
import { RoutesResponse, RoutesSelection } from '../RoutesSelection/RoutesSelection'
import { SidebarContext, SidebarContextProps } from '../../../SidebarLayout/SidebarLayout'

export type RouteSearchCardContextProps = {
    expandedCard: boolean
}

export const RouteSearchCardContext = createContext<RouteSearchCardContextProps | undefined>(undefined)

export type RouteSearchCardProps = {
    routes?: RoutesResponse[]
    searchStatus: 'loading' | 'success' | 'error' | 'none'
    onSubmitSearch: (origin: string, destination: string, travelMode: string) => void
}

export function RouteSearchCard(props: RouteSearchCardProps) {
    const { routes, searchStatus, onSubmitSearch } = props
    const [expandedCard, setExpandedCard] = useState(true)
    const { expanded } = useContext(SidebarContext) as SidebarContextProps
    const [routes, setRoutes] = useState<RoutesResponse[]>()

    const handleSubmit = (origin: string, destination: string, travelMode: string) => {
        consultaRota(origin, destination, travelMode)
            .then((rotas) => {
                setRoutes(rotas)
                console.log(rotas)
            })
    }

    const consultaRota = async (origin: string, destination: string, travelMode: string) => {
        const response = await fetch(`https://gogood.brazilsouth.cloudapp.azure.com/rotas/${travelMode}?origem=${origin}&destino=${destination}`)
        const json = await response.json();

        return await json as RoutesResponse[]
    }

    return (
        <RouteSearchCardContext.Provider value={{ expandedCard }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '280px',
                position: 'absolute',
                gap: designTokens.spacing.small,
                top: designTokens.spacing.medium,
                left: expanded ? `calc(180px + ${designTokens.spacing.large})` : `calc(60px + ${designTokens.spacing.large})`,
                backgroundColor: 'transparent',
                transition: 'left 0.3s ease',
            }}>
                <RouteForm onClickExpand={() => { setExpandedCard(!expandedCard) }} onSubmit={onSubmitSearch} />
                <RoutesSelection routes={routes} searchStatus={searchStatus} />
            </div>
        </RouteSearchCardContext.Provider>
    )

}
