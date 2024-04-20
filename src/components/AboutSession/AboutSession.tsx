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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: designTokens.spacing.medium,
            backgroundImage: `url(${imageBg})`,
            backgroundSize: 'cover',
            height: '100%'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '100vw',
                height: '100vh',
                padding: designTokens.spacing.large,
            }}>
                <div style={{ width: '50%', margin: '0 10%' }}>

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
                <img src={image} alt="" style={{ width: '50%', height: '50%' }} />
            </div>
        </div>
    );
}
