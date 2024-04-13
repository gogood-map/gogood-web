import { designTokens } from 'design-tokens'
import { createContext, useContext, useState } from 'react'
import { RouteForm } from '../RouteForm/RouteForm'
import { RoutesSelection } from '../RoutesSelection/RoutesSelection'
import { SidebarContext, SidebarContextProps } from '../../../SidebarLayout/SidebarLayout'

export type RouteSearchCardContextProps = {
    expandedCard: boolean
}

export const RouteSearchCardContext = createContext<RouteSearchCardContextProps | undefined>(undefined)

export function RouteSearchCard() {
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
                <RouteForm onClickExpand={() => { setExpandedCard(!expandedCard) }} />
                <RoutesSelection />
            </div>
        </RouteSearchCardContext.Provider>
    )

}
