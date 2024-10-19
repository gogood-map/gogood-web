import { QtdCrime } from "../../../../utils/types/details"
import ItemRanking from "./ItemRanking"
import { designTokens } from "design-tokens"
type CardRankingProps = {
  lista?: QtdCrime[]
}


export function CardRanking(props: CardRankingProps) {
  const { lista } = props
  const cores = [
    designTokens.color.error, "#F18900", designTokens.color.alert
  ]
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing.small,
      marginRight: designTokens.spacing.medium,
      background: designTokens.color.grayScale[200],
      borderRadius: designTokens.borderRadius.medium,
      padding: designTokens.spacing.medium
    }}>
      <span style={{
        fontSize: designTokens.font.size.large,
        fontWeight: designTokens.font.weight.semiBold
      }}>
        Ranking
      </span>

      {lista?.map((item, index) => {
        if (index < 3) {
          return (
            <ItemRanking cor={cores[index]} item={item}></ItemRanking>
          )
        }
      })}
    </div>
  )
}
