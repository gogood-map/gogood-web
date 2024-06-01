import { designTokens } from 'design-tokens'
import { useForm } from 'react-hook-form'
import { AuthButton } from '../AuthButton/AuthButton'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { isEmail } from 'validator'
import { useNavigate } from 'react-router-dom'
import { GoogleResponse } from '../RegisterForm/RegisterForm'
import { User, useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { getUserByLogin } from '../../../../utils/requests/user'
import { toast } from 'react-toastify'

export type LoginUser = {
    entry: string,
    password: string
}

export function LoginForm() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const {
        register,
        watch,
        formState: { errors, isValid }
    } = useForm({ mode: 'all' })

    const onSubmit = (data: LoginUser) => {
        const notification = toast.loading('Entrando...')

        getUserByLogin(data.entry, data.password)
            .then(response => {
                toast.update(notification, {
                    render: 'Login realizado com sucesso',
                    type: 'success',
                    isLoading: false,
                    autoClose: 1000
                })
                const data = response.data
                login({
                    id: data.id,
                    name: data.nome,
                    email: data.email,
                    token: data.token,
                    birthdate: data.dataNascimento,
                    gender: data.genero,
                    picture: data.foto
                } as User, false)
                setTimeout(() => {
                    navigate('/mapa')
                }, 1500)
            })
            .catch(error => {
                toast.update(notification, {
                    render: 'Erro ao fazer login',
                    type: 'error',
                    isLoading: false,
                    autoClose: 1000
                })
                console.error('Erro ao fazer login', error)
            })
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
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            gap: designTokens.spacing.medium,
        }}>
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

                <label htmlFor='email' style={{
                    fontWeight: designTokens.font.weight.medium,
                    color: designTokens.color.secondary,
                }} > Email </label>
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
                <label htmlFor='password' style={{
                    fontWeight: designTokens.font.weight.medium,
                    color: designTokens.color.secondary,
                }}> Senha </label>
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
                onClickSubmit={() => {
                    onSubmit({
                        entry: watch('email'),
                        password: watch('password')
                    })
                }}
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
                            const userGoogleId = userInfo.sub
                            onSubmit({ entry: userInfo.email, password: userGoogleId })
                        }
                    }}
                    shape='circle'
                    onError={() => console.error("Erro ao logar com Google")}
                />
                <div style={{
                    display: 'flex',
                    gap: designTokens.spacing.small
                }}>
                    É novo na nossa plataforma?
                    <a
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = designTokens.color.text
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = designTokens.color.selectedLight
                        }}
                        style={{
                            color: designTokens.color.selectedLight,
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                        onClick={() => { navigate('/cadastro') }}
                    > Cadastre-se </a>

                </div>
            </div>
        </form>
    )
}
