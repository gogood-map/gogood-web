import { designTokens } from "design-tokens";
import { useContext } from "react";
import { RouteSearchCardContext, RouteSearchCardContextProps } from "../RouteSearchCard/RouteSearchCard";
import { RouteOption } from "../RouteOption/RouteOption";

export type RoutesResponse = {
    origem: string
    destino: string
    distancia: number
    duracao: string
    horarioSaida: string
    horarioChegada: string
    qtdOcorrenciasTotais: number
    polyline: string
    etapas: {
        instrucao: string
    }[]
}

type RoutesSelectionProps = {
    routes: RoutesResponse[]
}

export function RoutesSelection(props: RoutesSelectionProps) {
    const { routes } = props
    const { expandedCard } = useContext(RouteSearchCardContext) as RouteSearchCardContextProps

    const orderedRoutes = (routes: RoutesResponse[]) => routes.sort((a, b) => {
        const durationA = a.qtdOcorrenciasTotais;
        const durationB = b.qtdOcorrenciasTotais;

        return durationA - durationB;
    });

    const stringToMinutes = (duration: string) => {
        const parts = duration.split(' ');
        let totalMinutos = 0;

        for (let i = 0; i < parts.length; i += 2) {
            const value = parseInt(parts[i], 10);
            const unit = parts[i + 1];

            switch (unit) {
                case 'hora':
                case 'horas':
                    totalMinutos += value * 60;
                    break;
                case 'minuto':
                case 'minutos':
                    totalMinutos += value;
                    break;
                default:
                    throw new Error(`Unidade inválida: ${unit}`);
            }
        }

        return totalMinutos;
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: expandedCard ? `calc(57px + (35 * ${routes.length}))` : '0px',
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

                {orderedRoutes(routes).map((route, index) => {
                    const durationInMinutes = stringToMinutes(route.duracao);
                    const color = index === 0 ? designTokens.color.success : index === 1 ? designTokens.color.alert : designTokens.color.error;
                    const risk = index === 0 ? 'Menor Risco' : index === 1 ? 'Risco Médio' : 'Risco Alto';
                    return <RouteOption key={index} risk={risk} durationInMinutes={durationInMinutes} color={color} />;
                })}
            </div>
        </div>
    )
}