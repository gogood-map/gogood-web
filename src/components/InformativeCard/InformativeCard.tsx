import { designTokens } from 'design-tokens'
import { useState } from 'react'
import { TagProps, CardTag } from '../CardTag/CardTag'

export type InformativeCardProps = {
    title: string
    tags?: TagProps[]
    onClick: () => void
}

export function InformativeCard(props: InformativeCardProps) {
    const { title, tags, onClick } = props
    const [isHovered, setIsHovered] = useState(false)

    const defaultStyle = {
        display: 'flex',
        minWidth: `calc(300px - ${designTokens.spacing.large} - ${designTokens.spacing.large})`,
        height: `calc(126px - ${designTokens.spacing.medium} - ${designTokens.spacing.medium})`,
        paddingTop: designTokens.spacing.medium,
        paddingBottom: designTokens.spacing.medium,
        paddingRight: designTokens.spacing.large,
        paddingLeft: designTokens.spacing.large,
        marginTop: designTokens.spacing.large,
        marginBottom: designTokens.spacing.large,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: designTokens.borderRadius.large,
        backgroundColor: designTokens.color.ligthGray,
        boxShadow: designTokens.color.cardShadow,
        transition: 'transform .5s ease',
        cursor: 'default',
    } as React.CSSProperties

    const hoverStyle = {
        transform: 'scale(1.02)',
    } as React.CSSProperties

    return (
        <div onMouseEnter={() => { setIsHovered(true) }}
            onMouseLeave={() => { setIsHovered(false) }}
            style={isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle}>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: designTokens.spacing.small
            }}>
                <div style={{
                    color: designTokens.color.text,
                    fontFamily: designTokens.font.family,
                    fontSize: designTokens.font.size.large,
                    fontStyle: 'normal',
                    fontWeight: designTokens.font.weight.bold,
                    lineHeight: designTokens.font.lineHeight.large
                }}>
                    {title}
                </div>
                {tags && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: designTokens.spacing.small
                    }}>
                        {Array.isArray(tags) && tags.map((tag, index) => (
                            <CardTag key={index} {...tag} />
                        ))}
                    </div>
                )}
            </div>
            <div style={{
                color: designTokens.color.secondary,
                fontFamily: designTokens.font.family,
                fontSize: designTokens.font.size.medium,
                fontStyle: 'normal',
                fontWeight: designTokens.font.weight.medium,
                lineHeight: designTokens.font.lineHeight.medium,
                width: '100%',
                display: 'flex',
                justifyContent: 'right',
            }}>
                <span onClick={onClick} style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    userSelect: 'none'
                }}> Mais detalhes </span>
            </div>

        </div>
    )
}
