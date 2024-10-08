import { QtdCrime } from "../../../../utils/types/details"
import ItemRanking from "./ItemRanking"
import { designTokens } from "design-tokens"
type CardRankingProps = {
    lista?: QtdCrime[]
}


export function CardRanking(props: CardRankingProps){
    const {lista} = props
    const cores = [
        designTokens.color.error, "#F18900", designTokens.color.alert
    ]
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
        }}>
          <span
            style={{
                fontSize: '24px',
                fontWeight: designTokens.font.weight.semiBold
            }}
            >Ranking
          </span>
          
          {
            lista?.map((item, index)=>{
                if(index < 3){
                    return(
                    
                        <ItemRanking cor={cores[index]} item={item}></ItemRanking>
                       )
                }   
                })
          }
          

          

    </div>
    )
}