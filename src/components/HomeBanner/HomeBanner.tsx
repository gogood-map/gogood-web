import { designTokens } from "design-tokens"

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
            height: '550px',
            alignSelf: 'stretch',
            justifyContent: 'center',
        }}>
            {title && !subtitle && !onClick && (
                <h1 style={{
                    color: designTokens.color.text,
                    marginTop: designTokens.spacing.small,
                    marginBottom: designTokens.spacing.large,
                    fontSize: '55px',
                    fontWeight: '700',
                    maxWidth: '50%',
                    height: 'min-content',
                    zIndex: 1
                }}> {title} </h1>
            )}

            {subtitle && !onClick && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '40%',
                    height: '100%',
                    marginRight: 'auto',
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        marginTop: designTokens.spacing.small,
                        marginBottom: designTokens.spacing.large,
                        fontSize: '55px',
                        fontWeight: '700',
                        height: 'min-content',
                        zIndex: 1
                    }}> {title} </h1>

                    <p style={{
                        color: designTokens.color.text,
                        fontSize: '20px',
                        lineHeight: '29px',
                        marginTop: 0,
                        marginBottom: 0,
                        zIndex: 1
                    }}> {subtitle} </p>
                </div>
            )}

            {onClick && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '40%',
                    height: '100%',
                    marginRight: '-64px',
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        marginTop: designTokens.spacing.small,
                        marginBottom: designTokens.spacing.large,
                        fontSize: '55px',
                        fontWeight: '700',
                        height: 'min-content',
                        zIndex: 1
                    }}> {title} </h1>

                    <p style={{
                        color: designTokens.color.text,
                        fontSize: '20px',
                        lineHeight: '29px',
                        marginTop: 0,
                        marginBottom: 0,
                        zIndex: 1
                    }}> {subtitle} </p>

                    <button style={{
                        width: '200px',
                        height: '80px',
                        backgroundColor: '#00B176',
                        border: 'none',
                        borderRadius: designTokens.borderRadius.medium,
                        marginTop: designTokens.spacing.medium,
                        paddingLeft: designTokens.spacing.large,
                        paddingRight: designTokens.spacing.large,
                        paddingTop: designTokens.spacing.small,
                        paddingBottom: designTokens.spacing.small,
                        zIndex: 1
                    }} onClick={onClick}> 
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: designTokens.color.white,
                        }}> Navegar </span>
                    </button>
                </div>
            )}
            {image && (
                <img src={image} alt="Banner" style={{
                    width: 'auto',
                    height: '100%',
                    objectFit: 'contain'
                }} />
            )}


        </div>
    )
}