import React from 'react';
import { HomeBanner } from '../../components/HomeBanner/HomeBanner';
import bannerImage from '../../assets/banner-image.svg';
import { useNavigate } from 'react-router-dom';
import aboutBackground from '../../assets/about-background.svg';
import aboutIlustration from '../../assets/about-ilustration.svg';
import { AboutSession } from '../../components/AboutSession/AboutSession';
import { Footer } from '../../components/Footer/Footer';
import Dashboard from '../../components/Dashboard/Dashboard';
import newBannerImage from '../../assets/new-banner-image.svg'

export function Home() {
    const navigate = useNavigate();

    const bannerTitle = 'Segurança e tranquilidade em cada jornada.';
    const bannerSubtitle = 'Explore com confiança nossa plataforma. Indicamos a melhor rota para você. Combinamos tecnologia avançada e dados precisos para proporcionar uma experiência de navegação tranquila. Viaje com tranquilidade, vai de good!';
    const bannerOnClick = () => navigate('/mapa');

    const aboutSubtitle = 'OVERVIEW';
    const aboutTitle = 'Sobre a Gogood';
    const aboutBody = 'Você está pronto para uma nova era de navegação? Por trás da interface simples e intuitiva da nossa plataforma, está uma poderosa combinação de tecnologia avançada e dados precisos. Utilizamos algoritmos inteligentes para analisar todas as opções de rota e fornecer a você a melhor escolha possível.\n\n E o melhor de tudo? Você pode relaxar e aproveitar a viagem, sabendo que está em boas mãos. Nossa plataforma é projetada para proporcionar uma experiência de navegação tranquila, para que você possa se concentrar no que realmente importa: aproveitar o momento e explorar novos lugares.';




    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        }}>
            <HomeBanner
                image={newBannerImage}
                title={bannerTitle}
                subtitle={bannerSubtitle}
                onClick={bannerOnClick}
            />

            <Dashboard 
            title='Escala de crimes em sua região'
            subtitle='23'/>


            <AboutSession
                image={aboutIlustration}
                subtitle={aboutSubtitle}
                title={aboutTitle}
                body={aboutBody}
                imageBg={aboutBackground}
            />
            <Footer />
        </div>
    );
}
