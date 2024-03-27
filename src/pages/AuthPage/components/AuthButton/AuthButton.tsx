import { designTokens } from 'design-tokens'
import ArrowButtonNext from '../../../../assets/ArrowButtonNext.svg'
import ArrowButtonBack from '../../../../assets/ArrowButtonBack.svg'

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
            marginTop: designTokens.spacing.medium,
        }}>
            {currentStep > 0 && (
                <button style={{
                    backgroundColor: 'transparent',
                    backgroundImage: `url(${ArrowButtonBack})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    color: designTokens.color.text,
                    border: `none`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px',
                }} onClick={onClickBack}
                type='reset'
                value={''} />
            )}
            {currentStep < steps - 1 && (
                <button style={{
                    backgroundColor: 'transparent',
                    backgroundImage: `url(${ArrowButtonNext})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    color: designTokens.color.text,
                    border: `none`,
                    borderRadius: '50%',
                    cursor: disabled ? 'undefined' : 'pointer',
                    width: '50px',
                    height: '50px',
                    opacity: disabled ? 0.5 : 1,
                }} onClick={onClickNext}
                    disabled={disabled}
                    value={''} />
            )}
            {currentStep === steps - 1 && (
                <button style={{
                    backgroundColor: 'transparent',
                    backgroundImage: `url(${ArrowButtonNext})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    color: designTokens.color.text,
                    border: `none`,
                    borderRadius: '50%',
                    cursor: disabled ? 'undefined' : 'pointer',
                    width: '50px',
                    height: '50px',
                }} onClick={onClickSubmit}
                    disabled={disabled}
                    type='submit'
                    value={''} />
            )}

        </div>
    )
}
