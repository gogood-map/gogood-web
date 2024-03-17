import { HomeBanner } from './HomeBanner'
import ImageBanner from '../../assets/ImageBanner.svg'

export default {
    title: 'Components/HomeBanner',
    component: HomeBanner,
}

const title = 'Segurança e tranquilidade em cada jornada.'
const subtitle = 'Explore com confiança nossa plataforma. Indicamos a melhor rota para você. Combinamos tecnologia avançada e dados precisos para proporcionar uma experiência de navegação tranquila. Viaje com tranquilidade, vai de good!'
const onClick = () => console.log('Clicou!')

const Template = () => (
    <HomeBanner
        image={ImageBanner}
        title={title}
        subtitle={subtitle}
        onClick={onClick}
    />
)

export const Default = Template.bind({})