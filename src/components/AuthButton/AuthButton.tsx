import { designTokens } from "design-tokens"

export type AuthButtonProps = {
    steps: number
    currentStep: number
    onClickBack: () => void
    onClickNext: () => void
    onClickSubmit: () => void
}

export function AuthButton(props: AuthButtonProps) {
    const { steps, currentStep, onClickBack, onClickNext, onClickSubmit } = props
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: designTokens.spacing.medium,
        }}>
            {currentStep > 0 && (
                <button style={{
                    backgroundColor: 'transparent',
                    color: designTokens.color.text,
                    border: `1px solid ${designTokens.color.secondary}`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px',
                }} onClick={onClickBack}>
                    Back
                </button>
            )}
            {currentStep < steps - 1 && (
                <button style={{
                    backgroundColor: 'transparent',
                    color: designTokens.color.text,
                    border: `1px solid ${designTokens.color.secondary}`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px',
                }} onClick={onClickNext}>
                    Next
                </button>
            )}
            {currentStep === steps - 1 && (
                <button style={{
                    backgroundColor: 'transparent',
                    color: designTokens.color.text,
                    border: `1px solid ${designTokens.color.secondary}`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px',
                }} onClick={onClickSubmit}>
                    Submit
                </button>
            )}

        </div>
    )
}