import { designTokens } from "design-tokens";
import { useContext } from "react";
import { RouteSearchCardContext, RouteSearchCardContextProps } from "../RouteSearchCard/RouteSearchCard";

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
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                    boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
                    backgroundColor: designTokens.color.white,
                    borderRadius: designTokens.borderRadius.smallMedium
                }}>
                    <div style={{
                        gap: designTokens.spacing.tiny,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <div style={{
                            width: '32px',
                            height: '12px',
                            backgroundColor: designTokens.color.error,
                            borderRadius: designTokens.borderRadius.small,
                        }} />
                        <div style={{
                            color: designTokens.color.text,
                            fontSize: designTokens.font.size.small,
                            fontWeight: designTokens.font.weight.bold,
                        }}>
                            Alto Risco
                        </div>
                    </div>

                    <div style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.small,
                        fontWeight: designTokens.font.weight.bold,
                    }}>
                        20 min
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                    boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
                    backgroundColor: designTokens.color.white,
                    borderRadius: designTokens.borderRadius.smallMedium
                }}>
                    <div style={{
                        gap: designTokens.spacing.tiny,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <div style={{
                            width: '32px',
                            height: '12px',
                            backgroundColor: designTokens.color.alert,
                            borderRadius: designTokens.borderRadius.small,
                        }} />
                        <div style={{
                            color: designTokens.color.text,
                            fontSize: designTokens.font.size.small,
                            fontWeight: designTokens.font.weight.bold,
                        }}>
                            Médio Risco
                        </div>
                    </div>

                    <div style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.small,
                        fontWeight: designTokens.font.weight.bold,
                    }}>
                        30 min
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                    boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
                    backgroundColor: designTokens.color.white,
                    borderRadius: designTokens.borderRadius.smallMedium
                }}>
                    <div style={{
                        gap: designTokens.spacing.tiny,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <div style={{
                            width: '32px',
                            height: '12px',
                            backgroundColor: designTokens.color.success,
                            borderRadius: designTokens.borderRadius.small,
                        }} />
                        <div style={{
                            color: designTokens.color.text,
                            fontSize: designTokens.font.size.small,
                            fontWeight: designTokens.font.weight.bold,
                        }}>
                            Baixo Risco
                        </div>
                    </div>

                    <div style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.small,
                        fontWeight: designTokens.font.weight.bold,
                    }}>
                        40 min
                    </div>
                </div>
            </div>
        </div>
    )
}