import { HomeBanner } from '../../components/HomeBanner/HomeBanner'
import ImageBanner from '../../assets/ImageBanner.svg'

export function Home() {

    const bannerTitle = 'Segurança e tranquilidade em cada jornada.'
    const bannerSubtitle = 'Explore com confiança nossa plataforma. Indicamos a melhor rota para você. Combinamos tecnologia avançada e dados precisos para proporcionar uma experiência de navegação tranquila. Viaje com tranquilidade, vai de good!'
    const bannerOnClick = () => console.log('Clicou!')

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        }}>
            <HomeBanner 
                image={ImageBanner}
                title={bannerTitle}
                subtitle={bannerSubtitle}
                onClick={bannerOnClick} 
            />
        </div>
    )
}