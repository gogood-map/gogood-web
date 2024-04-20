import { designTokens } from 'design-tokens'

export type NewsCardProps = {
    img: string,
    title: string,
    description: string
}

export function NewsCard(props: NewsCardProps) {
    const { img, title, description } = props

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '15vw',
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: designTokens.borderRadius.medium,
            overflow: 'hidden'
        }}>

            <div style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '12vw'
            }}/>

            <div style={{
                color: designTokens.color.text,
                fontFamily: designTokens.font.family,
                fontSize: designTokens.font.size.large,
                fontWeight: designTokens.font.weight.bold,
                marginBottom: designTokens.spacing.small,
                marginTop: designTokens.spacing.medium,
                marginLeft: designTokens.spacing.medium
            }}>
                {title}
            </div>
            <div style={{
                fontFamily: designTokens.font.family,
                color: designTokens.color.text,
                fontSize: designTokens.font.size.mediumLarge,
                marginLeft: designTokens.spacing.medium,
                marginBottom: designTokens.spacing.medium
            }}>
                {description}
            </div>
        </div>
    )
}
