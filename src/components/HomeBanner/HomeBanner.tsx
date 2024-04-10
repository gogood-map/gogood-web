import { designTokens } from 'design-tokens'

export type HomeBannerProps = {
    image?: string
    title?: string
    subtitle?: string
    onClick?: () => void
}

export function HomeBanner(props: HomeBannerProps) {
    const { image, title, subtitle, onClick } = props

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            maxHeight: '550px',
            alignSelf: 'stretch',
            justifyContent: 'start',
            backgroundImage: `url(${image})`,
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '600px',
                height: '100%',
                marginRight: 'auto',
            }}>

                {title && (
                    <h1 style={{
                        color: designTokens.color.text,
                        marginTop: designTokens.spacing.small,
                        marginBottom: designTokens.spacing.large,
                        fontSize: '55px',
                        fontWeight: '700',
                        width: '100%',
                        height: 'min-content',
                        zIndex: 1
                    }}> {title} </h1>
                )}

                {subtitle && (
                    <p style={{
                        color: designTokens.color.text,
                        fontSize: '20px',
                        lineHeight: '29px',
                        marginTop: 0,
                        marginBottom: 0,
                        zIndex: 1
                    }}> {subtitle} </p>
                )}

                {onClick && (
                    <button style={{
                        width: '209px',
                        height: '78px',
                        backgroundColor: '#00B176',
                        border: 'none',
                        borderRadius: designTokens.borderRadius.medium,
                        marginTop: designTokens.spacing.medium,
                        paddingLeft: designTokens.spacing.large,
                        paddingRight: designTokens.spacing.large,
                        paddingTop: designTokens.spacing.small,
                        paddingBottom: designTokens.spacing.small,
                        zIndex: 1,
                        transition: 'background-color .2s ease-in-out',
                        cursor:'pointer',
                    }} 
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#147454'
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#00B176'
                    }}
                    onClick={onClick}>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: designTokens.color.white,
                        }}> Navegar </span>
                    </button>
                )}

            </div>
        </div>

    )
}