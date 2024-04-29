import { designTokens } from 'design-tokens'
import { useForm } from 'react-hook-form'
import { AuthButton } from '../AuthButton/AuthButton'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { isEmail } from 'validator'
import { useNavigate } from 'react-router-dom'
import { GoogleResponse } from '../RegisterForm/RegisterForm'
import { User, useAuth } from '../../../../hooks/AuthProvider/AuthProvider'

export function LoginForm() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({ mode: 'all' })

    const onSubmit = (data: unknown) => {
        console.log(data)
    }

    const textInputStyle = {
        padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
        borderRadius: designTokens.borderRadius.medium,
        border: `1px solid ${designTokens.color.border}`,
        outline: 'none',
        fontSize: designTokens.font.size.medium,
        height: '25px',
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                gap: designTokens.spacing.medium,
            }}
        >
            <h1 style={{
                color: designTokens.color.text,
                fontSize: designTokens.font.size.extraLarge,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                margin: 0,
            }}>
                Login
            </h1>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>

                <label
                    htmlFor='email'
                    style={{
                        fontWeight: designTokens.font.weight.medium,
                        color: designTokens.color.secondary,
                    }}
                >
                    Email
                </label>
                <input
                    id='email'
                    type='email'
                    style={textInputStyle}
                    {...register('email', {
                        required: { value: true, message: 'Email obrigatório' },
                        validate: (value) => isEmail(value) || 'Email inválido',
                    })}
                    placeholder='Seu email'
                />
                {errors.email && (
                    <span style={{
                        color: designTokens.color.error,
                        fontSize: designTokens.font.size.small
                    }}>
                        {errors.email.message as string}
                    </span>
                )}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',

            }}>
                <label
                    htmlFor='password'
                    style={{
                        fontWeight: designTokens.font.weight.medium,
                        color: designTokens.color.secondary,
                    }}
                >
                    Senha
                </label>
                <input style={textInputStyle}
                    id='password'
                    type='password'
                    {...register('password', {
                        required: { value: true, message: 'Senha obrigatória' },
                        minLength: { value: 6, message: 'Senha deve ter no mínimo 6 caracteres' }
                    })}
                    placeholder='Sua senha'
                />
                {errors.password && (
                    <span style={{
                        color: designTokens.color.error,
                        fontSize: designTokens.font.size.small
                    }}>
                        {errors.password.message as string}
                    </span>
                )}
            </div>
            <AuthButton
                steps={1}
                currentStep={1}
                disabled={watch('email') === '' || watch('password') === '' || !isValid}
                onClickSubmit={() => { }}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: designTokens.spacing.tiny,
            }}>
                Ou entre com

                <GoogleLogin
                    type='icon'
                    text='signin'
                    onSuccess={response => {
                        if (response.credential) {
                            const userInfo = jwtDecode(response.credential) as GoogleResponse
                            const user = {
                                name: userInfo.name,
                                email: userInfo.email,
                                picture: userInfo.picture
                            } as User

                            login(user, true)
                        }
                    }}
                    shape='circle'
                    onError={() => console.log('error')}
                />
                <div style={{
                    display: 'flex',
                    gap: designTokens.spacing.small
                }}>
                    É novo na nossa plataforma?
                    <a
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = designTokens.color.secondary
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = designTokens.color.primary
                        }}
                        style={{
                            color: designTokens.color.primary,
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                        onClick={() => { navigate('/cadastro') }}
                    > Cadastro </a>

                </div>
            </div>
        </form>
    )
}