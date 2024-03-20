import { NewsCard } from './NewsCard'

export default {
    title: 'Components/NewsCard',
    component: NewsCard
}

const image = 'https://placehold.co/600x400'
const title = 'Title'
const description = 'Description'
const onClick = () => console.log('clicked')

export const Template = () => <>
    <NewsCard image={image} title={title} description={description} onClick={onClick} />
</>

export const Default = Template.bind({})