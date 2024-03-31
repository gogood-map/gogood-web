import { designTokens } from 'design-tokens'
import formNextButton from '../../../../assets/form-next-button.svg'
import formBackButton from '../../../../assets/form-back-button.svg'

export type AuthButtonProps = {
    steps: number
    currentStep: number
    disabled?: boolean
    onClickBack?: () => void
    onClickNext?: () => void
    onClickSubmit?: () => void
}

export function AuthButton(props: AuthButtonProps) {
    const { steps, currentStep, disabled, onClickBack, onClickNext, onClickSubmit } = props
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: designTokens.spacing.medium,
        }}>
            {currentStep > 0 && steps > 1 && (
                <button style={{
                    border: `none`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px',
                    padding: '0',
                }} onClick={onClickBack}
                    type='reset'
                    value={''}>
                    <img src={formBackButton} alt='Voltar' style={{
                        width: '100%',
                        height: '100%'
                    }} />
                </button>
            )}
            {currentStep < steps - 1 && steps > 1 && (
                <button style={{
                    border: `none`,
                    borderRadius: '50%',
                    cursor: disabled ? 'undefined' : 'pointer',
                    width: '50px',
                    height: '50px',
                    opacity: disabled ? 0.5 : 1,
                    padding: '0',
                }} onClick={onClickNext}
                    disabled={disabled}
                    value={''}>
                    <img src={formNextButton} alt='Próximo' style={{
                        width: '100%',
                        height: '100%'
                    }} />
                </button>
            )}
            {(currentStep === steps - 1 || steps === 1) && (
                <button style={{
                    border: `none`,
                    borderRadius: '50%',
                    cursor: disabled ? 'auto' : 'pointer',
                    width: '50px',
                    height: '50px',
                    opacity: disabled ? 0.5 : 1,
                    padding: '0',
                }} onClick={onClickSubmit}
                    disabled={disabled}
                    type='submit'
                    value={''}>
                    <img src={formNextButton} alt='Enviar' style={{
                        width: '100%',
                        height: '100%'
                    }} />
                </button>
            )}

        </div>
    )
}