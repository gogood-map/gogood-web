import BackgroundSign from '../../assets/BackgroundSign.svg'
import { AuthCard } from '../../components/AuthCard/AuthCard'
import { RegisterForm } from '../../components/RegisterForm/RegisterForm'

export type AuthPageProps = {
    type?: 'login' | 'register'
}

export function AuthPage(props: AuthPageProps) {
    const { type } = props

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
                <AuthCard>
                    <RegisterForm />
                </AuthCard>
            )}

        </div>
    )
}