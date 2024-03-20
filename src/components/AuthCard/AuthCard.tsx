import { designTokens } from "design-tokens"
import { useState } from "react"
import { Stepper } from "../Steper/Stepper"

export type Input = {

}

export type AuthCardProps = {
    title: string
    steps: {
        title: string
        inputs: {
            
        }[]
    }[]
    onComplete?: () => void
}

export function AuthCard(props: AuthCardProps) {
    const { title, steps, inputs, onComplete } = props
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
                
                <h1 style={{
                    color: designTokens.color.text,
                    margin: 0,
                }}>{title}</h1>

                {steps[currentStep].inputs.map((input, index) => (
                    <input key={index}
                        style={{
                            padding: designTokens.spacing.medium,
                            borderRadius: designTokens.borderRadius.medium,
                            border: `1px solid ${designTokens.color.border}`,
                            outline: 'none',
                        }}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={input.value}
                        onChange={input.onChange}
                    />
                ))}
            </div>
        </div>
    )
}