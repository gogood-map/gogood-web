import { InformativeCard } from './InformativeCard'

export default {
    title: 'Components/InformativeCard',
    component: InformativeCard
}

const title = 'Registros'
const tags = [
    {
        name: 'Registros',
        color: '#12FFBB',
        textColor: '#334049'
    },
    {
        name: 'Tag 2',
        color: '#334049'
    }
]
const onClick = () => console.log('Clicou!')

const Template = () => <>
    <InformativeCard
        title={title}
        tags={tags}
        onClick={onClick}
    />
</>

export const Default = Template.bind({})