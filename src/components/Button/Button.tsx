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
        fontFamily: designTokens.font.family,
        cursor: 'pointer',
    }


    return (
        <>
            {(isSolid || !type) &&
                <button onClick={onClick}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1B242A'
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = designTokens.color.secondary
                }}
                
                    
                    style={{
                        ...commonStyles,
                        backgroundColor: designTokens.color.secondary,
                        color: designTokens.color.white,
                        border: `1.5px solid ${designTokens.color.secondary}`,
                        transition: 'background-color .2s ease-in-out',

                    }}>
                    {label}
                </button>
            }

            {isOutline &&
                <button onClick={onClick}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, .1)'
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = designTokens.color.white
                }}
                    
                    style={{
                        ...commonStyles,
                        backgroundColor: 'transparent',
                        color: designTokens.color.secondary,
                        border: `1.5px solid ${designTokens.color.secondary}`,
                        fontFamily: designTokens.font.family,
                        transition: 'background-color .2s ease-in-out',
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