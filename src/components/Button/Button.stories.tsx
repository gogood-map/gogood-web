import { Button } from './Button'

export default {
    title: 'Components/Button',
    component: Button,
}

const onClick = () => {
    console.log('Button clicked')
}

export const Solid = () => <Button type='solid' label='Solido' onClick={onClick} />

export const Outline = () => <Button type='outline' label='Outline' onClick={onClick} />

export const Text = () => <Button type='text' label='Text' onClick={onClick} />
