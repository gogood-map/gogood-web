import { Stepper } from './Stepper'

export default {
    title: 'Components/Stepper',
    component: Stepper,
}

const steps = [
    { title: 'Dados pessoais' },
    { title: 'Endereço' },
    { title: 'Finalização' }
]
const currentStep = 1


const Template = () => <Stepper steps={steps} currentStep={currentStep} />

export const Default = Template.bind({})
