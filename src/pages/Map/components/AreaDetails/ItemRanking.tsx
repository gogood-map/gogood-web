import { designTokens } from "design-tokens"


type ItemRankingProps ={
    cor: string
    crime: string,
    qtd: number
}
export default function ItemRanking(props: ItemRankingProps){
    const {cor, crime, qtd} = props

    return(
        <>
        <div style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: '8px'
        }}>
            <span style={{
                background: cor,
                width: '16px',
                height: '10px',
                borderRadius: designTokens.borderRadius.small
            }}/>
            <span style={{
                fontSize: designTokens.font.size.smallMedium,
                color: ''
            }}>
                {crime} - {qtd}
            </span>
        </div>
    </>
    )

}