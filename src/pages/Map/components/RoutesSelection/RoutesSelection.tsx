import { designTokens } from "design-tokens";
import { useContext } from "react";
import { RouteSearchCardContext, RouteSearchCardContextProps } from "../RouteSearchCard/RouteSearchCard";
import { RouteOption } from "../RouteOption/RouteOption";

export function RoutesSelection() {
    const { expandedCard } = useContext(RouteSearchCardContext) as RouteSearchCardContextProps

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: expandedCard ? '180px' : '0px',
            overflow: 'hidden',
            gap: designTokens.spacing.medium,
            padding: expandedCard
                ? `${designTokens.spacing.mediumLarge} ${designTokens.spacing.medium}`
                : `0px ${designTokens.spacing.medium}`,
            backgroundColor: designTokens.color.background,
            borderRadius: designTokens.borderRadius.medium,
            boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
            transition: 'height 0.3s ease',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                gap: designTokens.spacing.small,
                fontSize: designTokens.font.size.medium,
                fontWeight: designTokens.font.weight.bold,
                color: designTokens.color.text,
            }}>Selecione uma opção</div>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '1px',
                backgroundColor: designTokens.color.border,
            }} />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: designTokens.spacing.small,
                width: '70%'
            }}>

                <RouteOption risk="Risco Baixo" durationInMinutes={30} color={designTokens.color.success} />
                <RouteOption risk="Risco Médio" durationInMinutes={60} color={designTokens.color.alert} />
                <RouteOption risk="Risco Alto" durationInMinutes={130} color={designTokens.color.error} />

            </div>
        </div>
    )
}