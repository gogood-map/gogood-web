import { LogoImage } from './Logo'

export default {
    title: 'Components/Logo',
    component: LogoImage
}

export const Large = () => <LogoImage size='large' />

export const Medium = () => <LogoImage size='medium' />

export const Small = () => <LogoImage size='small' />

