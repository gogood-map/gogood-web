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
    onSubmitSearch: (origin: string, destination: string, travelMode: string) => void
    onSelectRoute?: (route: RoutesResponse) => void
    onCancelSelect?: () => void
    onClose?: () => void
    centerMap: number[]
}

export function RouteSearchCard(props: RouteSearchCardProps) {
    const { routes, searchStatus, selectedRoute, onSubmitSearch, onSelectRoute, onCancelSelect, onClose, centerMap } = props
    const [expandedCard, setExpandedCard] = useState(true)
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
                    onSubmit={onSubmitSearch} />
                <RoutesSelection
                    routes={routes}
                    searchStatus={searchStatus}
                    selectedRoute={selectedRoute}
                    onSelectRoute={onSelectRoute}
                    onCancelSelect={onCancelSelect}
                    onClose={onClose}
                />
                
                <AreaDetails centerMap={centerMap} />
                
               
            </div>
        </RouteSearchCardContext.Provider>
    )

}
