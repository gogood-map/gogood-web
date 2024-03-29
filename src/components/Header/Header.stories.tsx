import { Header } from './Header'
import { HeaderItem } from '../HeaderItem/HeaderItem'

export default {
    title: 'Components/Header',
    component: Header
}

export const Default = () => (
    <Header>
        <HeaderItem path='/' label='Home' />
        <HeaderItem path='/about' label='About' />
        <HeaderItem path='/contact' label='Contact' />
    </Header>
)
