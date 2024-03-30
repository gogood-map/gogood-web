import { Carousel } from './Carousel'

export default {
    title: 'Components/Carousel',
    component: Carousel,
}

const cards = [
    {
        title: 'Card 1',
        tags: [
            { name: 'Tag 1', color: 'red' },
            { name: 'Tag 2', color: 'blue' }
        ],
        onClick: () => { }
    },
    {
        title: 'Card 2',
        tags: [
            { name: 'Tag 3', color: 'green' },
            { name: 'Tag 4', color: 'yellow' }
        ],
        onClick: () => { }
    }
]

const Template = () => <Carousel cards={cards} />

export const Default = Template.bind({})
