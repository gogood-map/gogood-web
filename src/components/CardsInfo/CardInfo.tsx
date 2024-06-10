import { designTokens } from 'design-tokens'

export type CardProps = {
    titulo: string
    count: number
    label: string
    symbol: string
}

export function CardsInfo(props: CardProps) {
    const { titulo, count, label, symbol } = props

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: designTokens.spacing.large,
            paddingBottom: designTokens.spacing.medium,
            paddingRight: designTokens.spacing.medium,
            paddingLeft: designTokens.spacing.medium,
            borderRadius: designTokens.borderRadius.medium,
            boxShadow: `0 4px 4px ${designTokens.color.boxShadow}`,
            backgroundColor: designTokens.color.background,
            width: '50%'
        }}>
            <h2 style={{
                color: designTokens.color.text,
                fontWeight: 700,
                margin: 0
            }}>
                {titulo}
            </h2>
            <h1 style={{
                color: designTokens.color.text,
                fontWeight: 800,
                margin: 0
            }}>
                {count}
            </h1>
            <div style={{
                color: designTokens.color.text,
                fontWeight: 400,
                fontSize: designTokens.font.size.mediumLarge
            }}>
                {label}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%'
            }}>
                <img src={symbol} alt="" style={{
                bottom: designTokens.spacing.small,
                width: '50px', 
                height: '50px' 
            }} />
            </div>
        </div>
    )
}
