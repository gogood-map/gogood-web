import { CardTag } from './CardTag'

export default {
    title: 'Components/CardTag',
    component: CardTag
}

const tag = {
    name: 'Tag',
    color: 'red'
}

const Template = () => <CardTag {...tag} />

export const Default = Template.bind({})