import { designTokens } from "design-tokens"

type CardQtdOcorrenciaProps = {
    qtd?:number
}

export function CardQtdOcorrencia(props:CardQtdOcorrenciaProps){
    const {qtd} = props
    return(
        <div
        style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            width: '95%'
        }}
        >
        <div style={{
            background: '#0CB182', 
            borderRadius: designTokens.borderRadius.large,
            height: '44px',
            width: '4px'
            }}></div>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
            >
            <span
                style={{
                    fontSize: '12px'
                }}
                >Total de ocorrências
            </span>
            <span
                style={{
                    fontSize: '24px',
                    fontWeight: designTokens.font.weight.semiBold
                }}
                >{qtd}</span>
        </div>
       
    </div>
    )
}