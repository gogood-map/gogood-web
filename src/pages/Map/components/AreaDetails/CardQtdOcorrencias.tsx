import { designTokens } from "design-tokens"

type CardQtdOcorrenciaProps = {
    qtd?: number
}

export function CardQtdOcorrencia(props: CardQtdOcorrenciaProps) {
    const { qtd } = props
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: designTokens.spacing.medium,
            width: '100%'
        }}>
            <div style={{
                background: designTokens.color.selectedLight,
                borderRadius: designTokens.borderRadius.large,
                height: '100%',
                width: '4px'
            }} />
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <span style={{
                    fontSize: designTokens.font.size.small
                }}>
                    Total de ocorrências
                </span>
                <span style={{
                    fontSize: designTokens.font.size.large,
                    fontWeight: designTokens.font.weight.semiBold
                }}>
                    {qtd}
                </span>
            </div>
        </div>
    )
}
