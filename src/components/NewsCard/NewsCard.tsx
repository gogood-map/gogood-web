import { designTokens } from "design-tokens"
import { useState } from "react"

export type NewsCardProps = {
    image: string
    title: string
    description: string
    onClick: () => void
}

export function NewsCard(props: NewsCardProps) {
    const { image, title, description, onClick } = props
    const [isHovered, setIsHovered] = useState(false)

    const defaultStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        height: '300px',
        gap: designTokens.spacing.small,
        padding: designTokens.spacing.medium,
        backgroundColor: '#EFEEF5',
        boxShadow: `0px 4px 4px 0px ${designTokens.color.boxShadow}`,
        borderRadius: designTokens.borderRadius.medium,
        transition: 'transform .5s ease',
        cursor: 'pointer'
    } as React.CSSProperties

    const hoverStyle = {
        transform: 'scale(1.015)',
    } as React.CSSProperties

    return (
        <div style={ isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle }
            onMouseEnter={() => {setIsHovered(true)}}
            onMouseLeave={() => {setIsHovered(false)}}
            onClick={onClick}
        >
            <img src={image} alt={title} style={{
                width: '100%',
                height: '60%',
                objectFit: 'cover',
                borderRadius: designTokens.borderRadius.large
            }} />
            <div>
                <h2 style={{
                    color: designTokens.color.text
                }}>{title}</h2>
                <p style={{
                    color: designTokens.color.text
                }}>{description}</p>
            </div>
        </div>
    )
}