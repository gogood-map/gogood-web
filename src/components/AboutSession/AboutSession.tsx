import { designTokens } from 'design-tokens'

export type AboutSessionProps = {
    image: string,
    subtitle: string,
    title: string,
    body: string,
    imageBg: string
}

export function AboutSession(props: AboutSessionProps) {
    const { image, subtitle, title, body, imageBg } = props;

    const paragraphs = body.split('\n');

    return (
        <div id='sobre-nos' style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: designTokens.spacing.medium,
            height: '100%',
            width: '100%',
        }}>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                width: `calc(100% - ${designTokens.spacing.large} * 2)`,
                maxWidth: '1376px',
                padding: designTokens.spacing.large,
                gap: designTokens.spacing.large,
                height: 'fit-content',
                zIndex: 1,
                position: 'relative',
            }}>
                <img src={imageBg} alt="" style={{
                    position: 'absolute',
                    marginTop: '-130px',
                    height: `calc(100% + 130px)`,
                    width: '100vw',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    zIndex: -1,
                }} />
                <div style={{ width: '45%' }}>

                    <p style={{
                        fontSize: '16px',
                        color: '#089C71',
                        fontWeight: designTokens.font.weight.bold,
                        margin: '0',
                        height: '16px'
                    }}>
                        {subtitle}
                    </p>

                    <h1 style={{
                        display: 'flex',
                        color: designTokens.color.text,
                        fontSize: '55px',
                        fontWeight: '700',
                        margin: '0',
                    }}> {title} </h1>

                    {paragraphs.map((paragraph, index) => (
                        <p key={index} style={{
                            color: designTokens.color.text,
                            fontSize: '18px',
                            fontWeight: designTokens.font.weight.regular,
                            fontFamily: 'Poppins',
                            marginBottom: '10px',
                        }}>{paragraph}</p>
                    ))}
                </div>
                <img src={image} alt="" style={{ width: '55%', height: '100%' }} />
            </div>
        </div>
    );
}
