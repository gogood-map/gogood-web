import { useState } from 'react'
import { AuthButton, AuthButtonProps } from './AuthButton'

export default {
    title: 'Components/AuthButton',
    component: AuthButton
}

const Template = () => {
    const [currentStep, setCurrentStep] = useState(0)

    const authButtonExemple = {
        steps: 5,
        currentStep: currentStep,
        onClickBack: () => {
            setCurrentStep(currentStep - 1)
            console.log(currentStep)
        },
        onClickNext: () => {
            setCurrentStep(currentStep + 1)
            console.log(currentStep)
        },
        onClickFinish: () => {
            console.log('Finish')
        }
    } as AuthButtonProps

    return <AuthButton {...authButtonExemple} />
}

export const Default = Template.bind({})