import { designTokens } from 'design-tokens'

export type ButtonProps = {
    label: string
    type?: 'outline' | 'solid' | 'text'
    onClick: () => void
}

export function Button(props: ButtonProps) {
    const { label, type, onClick } = props
    const isSolid = type === 'solid'
    const isOutline = type === 'outline'
    const isText = type === 'text'

    const commonStyles = {
        paddingTop: designTokens.spacing.small,
        paddingBottom: designTokens.spacing.small,
        paddingLeft: designTokens.spacing.medium,
        paddingRight: designTokens.spacing.medium,
        borderRadius: designTokens.borderRadius.medium,
        fontSize: designTokens.font.size.medium,
        cursor: 'pointer',
    }

    const isSolidStyles = {
        backgroundColor: designTokens.color.secondary,
        color: designTokens.color.white,
        border: `1.5px solid ${designTokens.color.secondary}`,
    }

    const isOutlineStyles = {
        backgroundColor: 'transparent',
        color: designTokens.color.secondary,
        border: `1.5px solid ${designTokens.color.secondary}`,
    }

    const isTextStyles = {
        backgroundColor: 'transparent',
        color: designTokens.color.secondary,
        border: '1.5px solid transparent',
    }


    return (
        <>
            <button
                onClick={onClick}
                style={{
                    ...commonStyles,
                    ...(isSolid && isSolidStyles),
                    ...(isOutline && isOutlineStyles),
                    ...(isText && isTextStyles),
                }}
            >
                {label}
            </button>
        </>
    )
}