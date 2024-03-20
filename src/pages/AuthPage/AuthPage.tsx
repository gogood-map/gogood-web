import BackgroundSign from '../../assets/BackgroundSign.svg'
import { AuthCard } from '../../components/AuthCard/AuthCard'

export type AuthPageProps = {
    type?: 'login' | 'register'
}

export function AuthPage(props: AuthPageProps) {
    const { type } = props

    const loginSteps = [
        {
            title: 'Login',
            inputs: [
                { label: 'Email', type: 'email', placeholder: 'Digite seu email' },
                { label: 'Senha', type: 'password', placeholder: 'Digite sua senha' },
            ]
        }
    ]

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            backgroundImage: `url(${BackgroundSign})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            {type === 'login' && (
                <AuthCard title='Login' steps={loginSteps} />
            )}

        </div>
    )
}