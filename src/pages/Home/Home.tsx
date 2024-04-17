import { HomeBanner } from '../../components/HomeBanner/HomeBanner'
import { Carousel } from '../../components/Carousel/Carousel'
import { designTokens } from 'design-tokens'
import bannerImage from '../../assets/banner-image.svg'
import { useNavigate } from 'react-router-dom'
import { NewsCardContainer } from '../../components/NewsCard/NewsCardContainer'

export function Home() {
    const navigate = useNavigate()

    const bannerTitle = 'Segurança e tranquilidade em cada jornada.'
    const bannerSubtitle = 'Explore com confiança nossa plataforma. Indicamos a melhor rota para você. Combinamos tecnologia avançada e dados precisos para proporcionar uma experiência de navegação tranquila. Viaje com tranquilidade, vai de good!'
    const bannerOnClick = () => navigate('/mapa')

    const cards = [
        {
            title: 'Casos de crimes',
            tags: [{ name: 'Últimas 24h', color: designTokens.color.secondary }],
            onClick: () => { }
        },
        {
            title: 'Escala de furtos',
            tags: [{ name: 'Queda', color: '#10C200' }],
            onClick: () => { }
        },
        {
            title: 'Registros',
            tags: [{ name: 'Última semana', color: designTokens.color.secondary }],
            onClick: () => { }
        },
        {
            title: 'Sua região',
            tags: [{ name: 'Últimos dias', color: designTokens.color.secondary }, { name: 'alerta', color: '#F11D00' }],
            onClick: () => { }
        }
    ]
    const newsCards = [
        {
            title: 'Casos de crimes',
            img: 'https://placehold.co/600x400',
            description: 'Descrição',
        },
        {
            title: 'Casos de crimes',
            img: 'https://placehold.co/600x400',
            description: 'Descrição',
        },
        {
            title: 'Casos de crimes',
            img: 'https://placehold.co/600x400',
            description: 'Descrição'
        },
        {
            title: 'Casos de crimes',
            img: 'https://placehold.co/600x400',
            description: 'Descrição',
        }
    ]

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        }}>
            <HomeBanner
                image={bannerImage}
                title={bannerTitle}
                subtitle={bannerSubtitle}
                onClick={bannerOnClick}
            />
            <Carousel cards={cards} />
            <NewsCardContainer cards={newsCards} />
        </div>
    )
}