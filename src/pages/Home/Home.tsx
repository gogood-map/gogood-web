import aboutBackground from '../../assets/about-background.svg'
import aboutIlustration from '../../assets/about-ilustration.svg'
import newBannerImage from '../../assets/new-banner-image.svg'
import { HomeBanner } from '../../components/HomeBanner/HomeBanner'
import { useNavigate } from 'react-router-dom'
import { AboutSession } from '../../components/AboutSession/AboutSession'
import { Footer } from '../../components/Footer/Footer'
import { DashboardContainer } from '../../components/DashboardContainer/DashBoardContainter'
import { DashboardCard } from '../../components/DashboardCard/DashboardCard'
import { designTokens } from 'design-tokens'
import { useEffect, useState } from 'react'
import { getCitySuburb, getDashboard } from '../../utils/requests/dashboard'
import { toast } from 'react-toastify'
import { CardsInfo } from '../../components/CardsInfo/CardInfo'
import userSymbol from '../../assets/Users.svg'
import dataSymbol from '../../assets/Database.svg'

export function Home() {
    const [data, setData] = useState<number[]>([])
    const [labels, setLabels] = useState<string[]>([])
    const [title, setTitle] = useState<string>('')
    const navigate = useNavigate()

    const bannerTitle = 'Segurança e tranquilidade em cada jornada.'
    const bannerSubtitle = 'Explore com confiança nossa plataforma. Indicamos a melhor rota para você. Combinamos tecnologia avançada e dados precisos para proporcionar uma experiência de navegação tranquila. Viaje com tranquilidade, vai de good!'
    const bannerOnClick = () => navigate('/mapa')

    const aboutSubtitle = 'OVERVIEW'
    const aboutTitle = 'Sobre a Gogood'
    const aboutBody = 'Você está pronto para uma nova era de navegação? Por trás da interface simples e intuitiva da nossa plataforma, está uma poderosa combinação de tecnologia avançada e dados precisos. Utilizamos algoritmos inteligentes para analisar todas as opções de rota e fornecer a você a melhor escolha possível.\n\n E o melhor de tudo? Você pode relaxar e aproveitar a viagem, sabendo que está em boas mãos. Nossa plataforma é projetada para proporcionar uma experiência de navegação tranquila, para que você possa se concentrar no que realmente importa: aproveitar o momento e explorar novos lugares.'
    
    const CardTitleUser = 'Atualmente Somos'
    const CardCountUser = 124
    const CardLabelUser = 'Usuários'
    const CardSymbolUser = userSymbol

    const CardTitleData = 'Contamos com'
    const CardCountData = 500000
    const CardLabelData = 'Dados em nosso banco'
    const CardSymbolData = dataSymbol


    useEffect(() => {
        getDashboard('São Paulo', 'Cerqueira César').then(({ data }) => {
            const dataResponse = data.map(({ count }) => count)
            const labels = data.map(({ anoMes }) => anoMes)
            setData(dataResponse.reverse())
            setLabels(labels.reverse())
            setTitle('Escala de furtos em São Paulo - Cerqueira César')

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    getCitySuburb(position.coords.latitude, position.coords.longitude)
                        .then(({ data }) => {
                            getDashboard(data.address.city, data.address.suburb).then(({ data }) => {
                                const dataResponse = data.map(({ count }) => count)
                                const labels = data.map(({ anoMes }) => anoMes)
                                setData(dataResponse.reverse())
                                setLabels(labels.reverse())
                            }).catch(() => {
                                toast.error('Erro ao buscar dados da dashboard para localização atual')
                            }).finally(() => {
                                if (data.address.city && data.address.suburb) {
                                    setTitle(`Escala de furtos em ${data.address.city} - ${data.address.suburb}`)
                                }
                            })
                        }).catch(() => {
                            toast.error('Erro ao buscar dados de localização')
                        })
                })
            }
        }).catch(() => {
            toast.error('Erro ao buscar dados da dashboard')
        })
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: designTokens.spacing.medium,
        }}>
            <HomeBanner
                image={newBannerImage}
                title={bannerTitle}
                subtitle={bannerSubtitle}
                onClick={bannerOnClick}
            />

            <DashboardContainer>
                <DashboardCard
                    data={data}
                    labels={labels}
                    title={title}
                    height='50vh'
                    type='line'
                />
            </DashboardContainer>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: designTokens.spacing.medium,
            }}>
                <CardsInfo
                    titulo={CardTitleUser}
                    count={CardCountUser}
                    label={CardLabelUser}
                    symbol={CardSymbolUser}
                />

                <CardsInfo
                    titulo={CardTitleData}
                    count={CardCountData}
                    label={CardLabelData}
                    symbol={CardSymbolData}
                />
            </div>

            <AboutSession
                image={aboutIlustration}
                subtitle={aboutSubtitle}
                title={aboutTitle}
                body={aboutBody}
                imageBg={aboutBackground}
            />
            <Footer />
        </div>
    )
}
