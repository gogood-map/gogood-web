import { designTokens } from 'design-tokens'
import { AuthCard } from './compoenents/AuthCard/AuthCard'
import { LoginForm } from './compoenents/LoginForm/LoginForm'
import { RegisterForm } from './compoenents/RegisterForm/RegisterForm'
import formBackground from '../../assets/form-background.svg'
import backButton from '../../assets/back-button.svg'
import { useNavigate } from 'react-router-dom'

export type AuthPageProps = {
    type?: 'login' | 'register'
}

export function AuthPage(props: AuthPageProps) {
    const { type } = props
    const navigate = useNavigate()

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            backgroundImage: `url(${formBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <button
                style={{
                    position: 'absolute',
                    top: designTokens.spacing.medium,
                    left: designTokens.spacing.medium,
                    border: 'none',
                    borderRadius: '50%',
                    padding: '0',
                    boxShadow: `0px 4px 4px ${designTokens.color.boxShadow}`,
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px'
                }}
                onClick={() => { navigate('/') }}
            >
                <img src={backButton} alt='Voltar' style={{
                    width: '100%',
                    height: '100%'
                }} />
            </button>
            {type === 'register' && (
                <AuthCard>
                    <RegisterForm />
                </AuthCard>
            )}
            {type === 'login' && (
                <AuthCard>
                    <LoginForm />
                </AuthCard>
            )}

        </div>
    )
}