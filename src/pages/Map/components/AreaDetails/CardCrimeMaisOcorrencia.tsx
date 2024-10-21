import { designTokens } from 'design-tokens'
import { QtdCrime } from '../../../../utils/types/details'

type CardCrimeMaisOcorrenciaProps = {
    topCrime?: QtdCrime
}

export function CardCrimeMaisOcorrencia(props: CardCrimeMaisOcorrenciaProps) {
    const { topCrime } = props
    const formatText = (value: string) => {
        return value.replace('OUTROS', '').replace('-', '')
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: designTokens.spacing.tiny,
            marginRight: designTokens.spacing.medium,
            background: designTokens.color.grayScale[200],
            borderRadius: designTokens.borderRadius.medium,
            padding: designTokens.spacing.medium
        }}>
            <span style={{
                fontSize: designTokens.font.size.small,
            }}>
                Crime com mais ocorrências
            </span>
            <span style={{
                fontSize: designTokens.font.size.mediumLarge,
                fontWeight: designTokens.font.weight.semiBold
            }}>
                {topCrime && formatText(topCrime.crime)}
            </span>
        </div>
    )
}
