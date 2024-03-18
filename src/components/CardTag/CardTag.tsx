import { designTokens } from 'design-tokens'

export type TagProps = {
    name: string
    color: string
    textColor?: string
}

export function CardTag(props: TagProps) {
    const { name, color, textColor } = props

    return (
        <div style={{
            backgroundColor: color,
            borderRadius: designTokens.borderRadius.small,
            color: textColor ? textColor : designTokens.color.white,
            fontFamily: designTokens.font.family,
            fontSize: designTokens.font.size.small,
            fontStyle: 'normal',
            fontWeight: designTokens.font.weight.medium,
            lineHeight: designTokens.font.lineHeight.small,
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: designTokens.spacing.small,
            paddingRight: designTokens.spacing.small,
            width: 'fit-content'
        }}>
            {name}
        </div>
    )
}