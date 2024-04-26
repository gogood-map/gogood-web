import { designTokens } from "design-tokens"
import { NewsCard, NewsCardProps } from "./NewsCard"

export type NewsCardContainerProps = {
    cards: NewsCardProps[]
}

export function NewsCardContainer(props: NewsCardContainerProps) {
    const { cards } = props

    return (
        <div style={{
            display: 'flex',
            justifyContent:'space-evenly',
            flexWrap: 'wrap',
            width: '90%',
            gap: designTokens.spacing.medium,
            padding: designTokens.spacing.large
                    }} >
            {cards.map((card, index) => (
                <NewsCard key={index} {...card} />
            ))}
        </div>
    )
} 