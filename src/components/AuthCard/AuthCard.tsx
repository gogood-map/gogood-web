import { designTokens } from 'design-tokens'
import { useState } from 'react'
import { Stepper } from '../Steper/Stepper'
import { Question, QuestionProps } from '../Question/Question'

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

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '400px',
            gap: designTokens.spacing.mediumLarge,
            padding: designTokens.spacing.large,
            borderRadius: designTokens.borderRadius.medium,
            boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
        }}>
            {steps.length > 0 && (
                <Stepper steps={steps} currentStep={currentStep} />
            )}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: designTokens.spacing.medium,
                width: '100%',
            }}>
                
                {steps[currentStep].title && (
                    <div style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.medium,
                    }}>
                        {steps[currentStep].title}
                    </div>
                )}

                {steps[currentStep].inputs.map((input, index) => (
                    <Question key={index} {...input} />
                ))}

                <button style={{
                    padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                    borderRadius: designTokens.borderRadius.medium,
                    backgroundColor: designTokens.color.primary,
                    color: designTokens.color.white,
                    fontSize: designTokens.font.size.medium,
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                }} onClick={() => {
                    if (currentStep === steps.length - 1) {
                        onComplete && onComplete()
                    } else {
                        setCurrentStep(currentStep + 1)
                    }
                }}>
                    {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </button>
            </div>
        </div>
    )
}