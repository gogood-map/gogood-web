import { designTokens } from 'design-tokens'
import { createContext, useContext, useState } from 'react'
import { RouteForm } from '../RouteForm/RouteForm'
import { RoutesResponse, RoutesSelection } from '../RoutesSelection/RoutesSelection'
import { SidebarContext, SidebarContextProps } from '../../../SidebarLayout/SidebarLayout'
import { AreaDetails } from '../AreaDetails/AreaDetails'

export type RouteSearchCardContextProps = {
    expandedCard: boolean
}
export type RouteDetailsCardContextProps = {
    expandedCard: boolean
}

export const RouteSearchCardContext = createContext<RouteSearchCardContextProps | undefined>(undefined)
export const RouteDetailsCardContext = createContext<RouteDetailsCardContextProps | undefined>(undefined)

export type RouteSearchCardProps = {
    routes?: RoutesResponse[]
    searchStatus: 'loading' | 'success' | 'error' | 'none'
    selectedRoute?: RoutesResponse
    onSubmitSearchRoute: (origin: string, destination: string, travelMode: string) => void
    onLocalSearch: (query: string)=>void
    onSelectRoute?: (route: RoutesResponse) => void
    onCancelSelect?: () => void
    onClose?: () => void
    centerMap: number[]
    radius: number
}

export function RouteSearchCard(props: RouteSearchCardProps) {
    const { routes, searchStatus, selectedRoute, onSubmitSearchRoute, onSelectRoute, onCancelSelect, onClose, centerMap, radius, onLocalSearch } = props
    const [expandedCard, setExpandedCard] = useState(false)
    const { expanded } = useContext(SidebarContext) as SidebarContextProps

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
                left: expanded
                    ? `calc(180px + ${designTokens.spacing.large})`
                    : `calc(60px + ${designTokens.spacing.large})`,
                backgroundColor: 'transparent',
                transition: 'left 0.3s ease',
            }}>
                <RouteForm onClickExpand={() => {
                    setExpandedCard(!expandedCard)
                }}
                    onSubmitSearchRoute={onSubmitSearchRoute} 
                    onSearchLocal={onLocalSearch}
                    />
                <RoutesSelection
                    routes={routes}
                    searchStatus={searchStatus}
                    selectedRoute={selectedRoute}
                    onSelectRoute={onSelectRoute}
                    onCancelSelect={onCancelSelect}
                    onClose={onClose}
                />
                
                <AreaDetails radius={radius} centerMap={centerMap} />
                
               
            </div>
        </RouteSearchCardContext.Provider>
    )

}
