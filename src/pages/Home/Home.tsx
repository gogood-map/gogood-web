import { HomeBanner } from '../../components/HomeBanner/HomeBanner'
import { Carousel } from '../../components/Carousel/Carousel'
import { designTokens } from 'design-tokens'
import bannerImage from '../../assets/banner-image.svg'
import { useNavigate } from 'react-router-dom'
import { NewsCardContainer } from '../../components/NewsCard/NewsCardContainer'
import aboutBackground from '../../assets/about-background.svg'
import aboutIlustration from '../../assets/about-ilustration.svg'
import { AboutSession } from '../../components/AboutSession/AboutSession'

export function Home() {
    const navigate = useNavigate()

    const bannerTitle = 'Segurança e tranquilidade em cada jornada.'
    const bannerSubtitle = 'Explore com confiança nossa plataforma. Indicamos a melhor rota para você. Combinamos tecnologia avançada e dados precisos para proporcionar uma experiência de navegação tranquila. Viaje com tranquilidade, vai de good!'
    const bannerOnClick = () => navigate('/mapa')

    const aboutSubtitle = 'OVERVIEW'
    const aboutTitle = 'Sobre a Gogood'
    const aboutBody = 'Você está pronto para uma nova era de navegação? Por trás da interface simples e intuitiva da nossa plataforma, está uma poderosa combinação de tecnologia avançada e dados precisos. Utilizamos algoritmos inteligentes para analisar todas as opções de rota e fornecer a você a melhor escolha possível.\n\n E o melhor de tudo? Você pode relaxar e aproveitar a viagem, sabendo que está em boas mãos. Nossa plataforma é projetada para proporcionar uma experiência de navegação tranquila, para que você possa se concentrar no que realmente importa: aproveitar o momento e explorar novos lugares.';

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
        },
        {
            title: 'Sua região',
            tags: [{ name: 'Últimos dias', color: designTokens.color.secondary }, { name: 'alerta', color: '#F11D00' }],
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
        },
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

            <AboutSession
                image={aboutIlustration}
                subtitle={aboutSubtitle}
                title={aboutTitle}
                body={aboutBody}
                imageBg={aboutBackground}
            />
            
        </div>
    )
}