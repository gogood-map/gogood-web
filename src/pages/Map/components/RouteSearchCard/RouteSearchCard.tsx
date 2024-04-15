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
    onSubmitSearch: (origin: string, destination: string, travelMode: string) => void
}

export function RouteSearchCard(props: RouteSearchCardProps) {
    const { routes, onSubmitSearch } = props
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
                left: expanded ? `calc(180px + ${designTokens.spacing.large})` : `calc(60px + ${designTokens.spacing.large})`,
                backgroundColor: 'transparent',
                transition: 'left 0.3s ease',
            }}>
                <RouteForm onClickExpand={() => { setExpandedCard(!expandedCard) }} onSubmit={onSubmitSearch} />
                {routes && <RoutesSelection routes={routes} />}
            </div>
        </RouteSearchCardContext.Provider>
    )

}
