import { designTokens } from 'design-tokens'

export type ButtonProps = {
    label: string
    type?: 'outline' | 'solid' | 'text' | 'primary'
    color?: string
    onClick: () => void
}

export function Button(props: ButtonProps) {
    const { label, type, color, onClick } = props

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
            {(type === 'solid' || !type) &&
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

            {type === 'outline' &&
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

            {type === 'text' &&
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

            {type === 'primary' &&
                <button onClick={onClick}
                    type='button'
                    onMouseEnter={(e) => {e.currentTarget.style.filter = 'brightness(80%)'}}
                    onMouseLeave={(e) => {e.currentTarget.style.filter = 'brightness(100%)'}}
                    style={{
                        ...commonStyles,
                        width: '100%',
                        backgroundColor: color || designTokens.color.selectedLight,
                        color: designTokens.color.white,
                        border: 'none'
                    }}>
                    {label}
                </button>
            }
        </>
    )
}
