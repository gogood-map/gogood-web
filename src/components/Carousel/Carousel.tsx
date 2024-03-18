import { designTokens } from 'design-tokens'
import { InformativeCard, InformativeCardProps } from '../InformativeCard/InformativeCard'

export type CarouselProps = {
    cards: InformativeCardProps[]
}

export function Carousel(props: CarouselProps) {
    const { cards } = props

    return (
        <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '100%',
            width: 'calc(100vw - 16px)',
            paddingTop: designTokens.spacing.large,
            paddingBottom: designTokens.spacing.large,
        }}>
            <div style={{
                display: 'flex',
                paddingLeft: designTokens.spacing.large,
                paddingRight: designTokens.spacing.large,
                gap: '20px',
                minWidth: '1376px',
                width: `${cards.length * 320}px`,
                overflow: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: `#00B176 ${designTokens.color.background}`,
            }}>
                {cards.map((card, index) => (
                    <InformativeCard key={index} {...card} />
                ))}

            </div>

        </div>
    )
}