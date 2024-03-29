import { designTokens } from 'design-tokens'
import { AuthCard } from './components/AuthCard/AuthCard'
import { LoginForm } from './components/LoginForm/LoginForm'
import { RegisterForm } from './components/RegisterForm/RegisterForm'
import BackgroundSign from '../../assets/BackgroundSign.svg'
import BackButton from '../../assets/BackButton.svg'

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
      <button
        style={{
          position: 'absolute',
          top: designTokens.spacing.medium,
          left: designTokens.spacing.medium,
          backgroundImage: `url(${BackButton})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          border: 'none',
          borderRadius: '50%',
          padding: designTokens.spacing.small,
          boxShadow: `0px 4px 4px ${designTokens.color.boxShadow}`,
          cursor: 'pointer',
          width: '50px',
          height: '50px'
        }}
        onClick={() => window.history.back()}
      >
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
