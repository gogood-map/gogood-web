import { designTokens } from "design-tokens"
import { QtdCrime } from "../../../../utils/types/details"


type ItemRankingProps ={
  cor: string
  item?: QtdCrime
}



export default function ItemRanking(props: ItemRankingProps){
    const {cor,item} = props
    const formatText = (value:string)=>{
        var valueFormated = value.toLowerCase()
        
        valueFormated = valueFormated.replace("outros", "")
        valueFormated = valueFormated.replace("-", "")

        return valueFormated[0].toUpperCase() + valueFormated.slice(1, valueFormated.length)
    }
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
                width: '10%',
                height: '10px',
                borderRadius: designTokens.borderRadius.small
            }}/>
            <span style={{
                width: '90%',
                fontSize: designTokens.font.size.smallMedium,
                color: ''
            }}>
                {item && formatText(item.crime)} - {item && item.qtdOcorrido} ocorrências
            </span>
        </div>
    </>
    )

}