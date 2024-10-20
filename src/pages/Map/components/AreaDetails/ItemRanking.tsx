import { designTokens } from 'design-tokens'
import { QtdCrime } from '../../../../utils/types/details'

type ItemRankingProps = {
    cor: string
    item?: QtdCrime
}

export default function ItemRanking(props: ItemRankingProps) {
    const { cor, item } = props
    const formatText = (value: string) => {
        const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        const words = value.match(/[a-zA-ZÀ-ÖØ-öø-ÿ]+/g) || []
        const pascalWords = words.map(capitalize)
        return pascalWords.join(' ').replace('Outros', '').replace('-', '')
    }

    return (
        <>
            <div style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                gap: designTokens.spacing.small,
            }}>
                <span style={{
                    background: cor,
                    width: '10%',
                    height: '10px',
                    borderRadius: designTokens.borderRadius.small
                }} />
                <span style={{
                    width: `calc(90% - ${designTokens.spacing.small})`,
                    fontSize: designTokens.font.size.smallMedium,
                    color: ''
                }}>
                    {item && formatText(item.crime)} - {item && item.qtdOcorrido} Ocorrências
                </span>
            </div>
        </>
    )

}
