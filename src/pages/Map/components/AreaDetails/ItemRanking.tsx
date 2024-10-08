import { designTokens } from "design-tokens"
import { QtdCrime } from "../../../../utils/types/details"


type ItemRankingProps ={
  cor: string
  item?: QtdCrime
}
export default function ItemRanking(props: ItemRankingProps){
    const {cor,item} = props

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
                {item?.crime} - {item?.qtdOcorrido}
            </span>
        </div>
    </>
    )

}