import { designTokens } from "design-tokens";
import { useContext } from "react";
import { RouteSearchCardContext, RouteSearchCardContextProps } from "../RouteSearchCard/RouteSearchCard";
import { RouteOption } from "../RouteOption/RouteOption";
import { LoaderIcon } from "../../../../components/LoaderIcon/LoaderIcon";

export function routesColors(routes: RoutesResponse[]) {
    let colors = routes.map(route => {
        const ocorrenciasPorKm = route.qtdOcorrenciasTotais / route.distancia;
        if (ocorrenciasPorKm < 75) {
            return designTokens.color.success;
        } else if (ocorrenciasPorKm < 150) {
            return designTokens.color.alert;
        } else {
            return designTokens.color.error;
        }
    })

    if (colors.every(color => color === designTokens.color.error)) {
        colors[0] = designTokens.color.success;
        colors[1] = designTokens.color.alert;
    } else if (colors.every(color => color === designTokens.color.alert)) {
        colors[0] = designTokens.color.success;
    } else if (colors.every(color => color === designTokens.color.success)) {
        colors = colors;
    } else if (!colors.includes(designTokens.color.success)) {
        colors[0] = designTokens.color.success;
        colors[1] = designTokens.color.alert;
    }

    return colors;
}

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
    routes?: RoutesResponse[]
    searchStatus: 'loading' | 'success' | 'error' | 'none'
    onSelectRoute?: (route: RoutesResponse) => void
}

export function RoutesSelection(props: RoutesSelectionProps) {
    const { routes, searchStatus, onSelectRoute } = props
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

    const sendSelectedRoute = (route: RoutesResponse) => {
        onSelectRoute && onSelectRoute(route);
        console.table(route);
    }

    const height = routes && expandedCard && searchStatus === 'success'
        ? `calc(60px + (35px * ${routes.length}) + (8px * ${routes.length - 1}))`
        : expandedCard && (searchStatus === 'loading' || searchStatus === 'error')
            ? 'calc(60px + 35px)'
            : '0px'

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: height,
            overflow: 'hidden',
            gap: designTokens.spacing.medium,
            padding: (expandedCard && routes) || (expandedCard && searchStatus !== 'none')
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

                {routes && searchStatus === 'success' && orderedRoutes(routes).map((route, index) => {
                    const durationInMinutes = stringToMinutes(route.duracao);
                    const color = routesColors(routes)[index];
                    const risk = index === 0 ? 'Menor Risco' : index === 1 ? 'Risco Médio' : 'Risco Alto';
                    return <RouteOption key={index} risk={risk} durationInMinutes={durationInMinutes} color={color} onClick={() => sendSelectedRoute(route)} />;
                })}

                {searchStatus === 'loading' && <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '35px',
                    fontSize: designTokens.font.size.smallMedium,
                    fontWeight: designTokens.font.weight.bold,
                    color: designTokens.color.text,
                }}>
                    <LoaderIcon size={35} />
                </div>}
                {searchStatus === 'error' && <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '35px',
                    fontSize: designTokens.font.size.smallMedium,
                    fontWeight: designTokens.font.weight.bold,
                    color: designTokens.color.text,
                }}>
                    Erro ao carregar rotas
                </div>}
            </div>
        </div>
    )
}
