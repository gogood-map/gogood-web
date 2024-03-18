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


    return (
        <>
            {(isSolid || !type) &&
                <button onClick={onClick}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = designTokens.color.secondary
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = designTokens.color.secondary
                        e.currentTarget.style.color = designTokens.color.white
                    }}
                    
                    style={{
                        ...commonStyles,
                        backgroundColor: designTokens.color.secondary,
                        color: designTokens.color.white,
                        border: `1.5px solid ${designTokens.color.secondary}`,

                    }}>
                    {label}
                </button>
            }

            {isOutline &&
                <button onClick={onClick}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = designTokens.color.secondary
                        e.currentTarget.style.color = designTokens.color.white
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = designTokens.color.secondary
                    }}

                    
                    style={{
                        ...commonStyles,
                        backgroundColor: 'transparent',
                        color: designTokens.color.secondary,
                        border: `1.5px solid ${designTokens.color.secondary}`
                    }}>
                    {label}
                </button>
            }

            {isText &&
                <button onClick={onClick}
                    style={{
                        ...commonStyles,
                        backgroundColor: 'transparent',
                        color: designTokens.color.secondary,
                        border: '1.5px solid transparent'
                    }}>
                    {label}
                </button>
            }
        </>
    )
}