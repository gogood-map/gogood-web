import { designTokens } from 'design-tokens'
import { InformativeCard, InformativeCardProps } from '../InformativeCard/InformativeCard'
import { useEffect, useState } from 'react'

export type CarouselProps = {
    cards: InformativeCardProps[]
}

export function Carousel(props: CarouselProps) {
    const { cards } = props
    const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setCurrentWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            paddingTop: designTokens.spacing.large,
            paddingBottom: designTokens.spacing.large,
        }}>
            <div style={{
                display: 'flex',
                justifyContent: cards.length * 320 < 1376 || cards.length * 320 > currentWindowWidth
                    ? 'flex-start'
                    : 'center',
                paddingLeft: designTokens.spacing.large,
                paddingRight: designTokens.spacing.large,
                gap: '20px',
                maxWidth: '100%',
                width: cards.length * 320 < 1376 && currentWindowWidth > 1376
                    ? '1376px'
                    : '100vw',
                overflowX: 'auto',
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