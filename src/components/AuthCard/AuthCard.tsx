import { designTokens } from 'design-tokens'
import { useState } from 'react'
import { Stepper } from '../Steper/Stepper'
import { Question, QuestionProps } from '../Question/Question'
import { AuthButton } from '../AuthButton/AuthButton'

export type AuthCardProps = {
    steps: {
        title: string
        inputs: QuestionProps[]
    }[]
    onComplete?: () => void
}

export function AuthCard(props: AuthCardProps) {
    const { steps, onComplete } = props
    const [currentStep, setCurrentStep] = useState(0)

    const onClickBack = () => {
        setCurrentStep(currentStep - 1)
    }

    const onClickNext = () => {
        setCurrentStep(currentStep + 1)
    }

    const onClickSubmit = () => {
        if (onComplete) {
            onComplete()
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '300px',
            maxHeight: '500px',
            gap: designTokens.spacing.mediumLarge,
            padding: designTokens.spacing.large,
            borderRadius: designTokens.borderRadius.medium,
            boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
        }}>
            {steps.length > 0 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                }}>
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>
            )}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: designTokens.spacing.medium,
                width: '100%',
            }}>

                {steps[currentStep].title && (
                    <h1 style={{
                        color: designTokens.color.text,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 0,
                    }}>
                        {steps[currentStep].title}
                    </h1>
                )}

                {steps[currentStep].inputs.map((input, index) => (
                    <Question key={index} {...input} />
                ))}
            </div>
            <AuthButton
                currentStep={currentStep}
                steps={steps.length}
                onClickBack={onClickBack}
                onClickNext={onClickNext}
                onClickSubmit={onClickSubmit}
            />
        </div>
    )
}