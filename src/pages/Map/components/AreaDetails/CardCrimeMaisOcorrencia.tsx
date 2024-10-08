import { designTokens } from "design-tokens"
import { QtdCrime } from "../../../../utils/types/details"

type CardCrimeMaisOcorrenciaProps = {
    topCrime?: QtdCrime
}

export function CardCrimeMaisOcorrencia(props: CardCrimeMaisOcorrenciaProps){
    const {topCrime} = props
    return(
        <div 
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '85%',
            background: '#F3F3F3',
            borderRadius: designTokens.borderRadius.medium,
            padding: designTokens.spacing.medium
        }}
    >
         <span
                style={{
                    fontSize: '12px'
                }}
                >Crime com mais ocorrencias
            </span>
            <span
                style={{
                    fontSize: '24px',
                    fontWeight: designTokens.font.weight.semiBold
                }}
                >{topCrime?.crime} - {topCrime?.qtdOcorrido} ocorrências</span>
    </div>
    )
}