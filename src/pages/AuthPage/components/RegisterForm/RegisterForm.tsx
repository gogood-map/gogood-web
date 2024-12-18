import { isAlpha, isBefore, isEmail } from 'validator'
import { designTokens } from 'design-tokens'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Stepper } from '../../../../components/Stepper/Stepper'
import { AuthButton } from '../AuthButton/AuthButton'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { User, useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { toast } from 'react-toastify'
import completeRegister from '../../../../assets/complete-register.svg'
import styled from 'styled-components'
import { createGoogleUser, createUser } from '../../../../utils/requests/user'
import { UserResponse } from '../../../../utils/types/user'

export type GoogleResponse = {
    aud: string
    azp: string
    email: string
    email_verified: true
    exp: number
    family_name: string
    given_name: string
    iat: number
    iss: string
    jti: string
    name: string
    nbf: number
    picture: string
    sub: string
}

export type RegisterGoogleUser = {
    email: string
    name: string
    googleId: string
}

export type RegisterUser = {
    email: string
    password: string
    name: string
    gender: string
    birthDate: string
}

export function RegisterForm() {
    const [formStep, setFormStep] = useState(0)
    const navigate = useNavigate()
    const { login } = useAuth()
    const {
        register, watch, formState: { errors }
    } = useForm({ mode: 'all' })

    const steps = [
        { title: 'Cadastro' },
        { title: 'Dados' },
        { title: 'Concluído' }
    ]

    const onSubmit = (data: RegisterUser) => {
        const notification = toast.loading('Cadastrando...', { autoClose: false })

        createUser({
            nome: data.name,
            email: data.email,
            senha: data.password,
            genero: data.gender,
            dt_Nascimento: data.birthDate,
        }).then(response => {
            const user = response.data as UserResponse
            toast.update(notification, {
                render: 'Cadastro realizado com sucesso!',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            login({
                id: user.userId,
                name: user.nome,
                email: user.email,
                birthdate: user.dt_nascimento,
                token: user.token,
                gender: user.genero || 'não especificado',
            } as User, false)
            setFormStep(2)
        }).catch(error => {
            toast.update(notification, {
                render: 'Erro ao cadastrar',
                type: 'error',
                isLoading: false,
                autoClose: 2000
            })
            console.error(error)
        }).finally(() => {
            setTimeout(() => {
                toast.dismiss(notification)
            }, 2000)
        })
    }

    const onGoogleSubmit = (data: RegisterGoogleUser) => {
        const notification = toast.loading('Cadastrando...', { autoClose: false })

        createGoogleUser({
            nome: data.name,
            email: data.email,
            google_id: data.googleId,
        }).then(() => {
            toast.update(notification, {
                render: 'Cadastro realizado com sucesso!',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            navigate('/login')
        }).catch(error => {
            toast.update(notification, {
                render: 'Erro ao cadastrar',
                type: 'error',
                isLoading: false,
                autoClose: 2000
            })
            console.error(error)
        }).finally(() => {
            setTimeout(() => {
                toast.dismiss(notification)
            }, 2000)
        })
    }

    useEffect(() => {
        if (formStep === 2) {
            setTimeout(() => {
                navigate('/mapa')
            }, 5000)
        }
    }, [formStep])

    const RadioInput = styled.input.attrs({ type: 'radio' })`
        appearance: none;
        accent-color: ${designTokens.color.primary};
        border-radius: 100%;
        border: 1px solid ${designTokens.color.border};
        width: ${designTokens.spacing.medium};
        height: ${designTokens.spacing.medium};
        margin: 0 0 0 ${designTokens.spacing.tiny};

        &:checked {
            background-color: ${designTokens.color.primary};
        }
    `
    const textInputStyle = {
        padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
        borderRadius: designTokens.borderRadius.medium,
        border: `1px solid ${designTokens.color.border}`,
        outline: 'none',
        fontSize: designTokens.font.size.medium,
        height: '25px',
    }

    const smallTextInputStyle = {
        padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
        borderRadius: designTokens.borderRadius.medium,
        border: `1px solid ${designTokens.color.border}`,
        outline: 'none',
        fontSize: designTokens.font.size.medium,
        height: '25px',
        width: '200px'
    }

    return (
        <form style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Stepper steps={steps} currentStep={formStep} />
            {formStep >= 0 && (
                <section style={{
                    display: formStep === 0 ? 'flex' : 'none',
                    width: '100%',
                    flexDirection: 'column',
                    gap: designTokens.spacing.medium,
                    paddingTop: designTokens.spacing.medium,
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.extraLarge,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 0,
                    }}>
                        Cadastre-se
                    </h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <label htmlFor='email'>Email</label>
                        <input style={textInputStyle}
                            id='email'
                            type='email'
                            {...register('email', {
                                required: { value: true, message: 'Email obrigatório' },
                                validate: (value) => isEmail(value) || 'Email inválido',
                            })}
                            placeholder='Seu email'
                        />
                        {errors.email && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.email.message as string}</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <label htmlFor='password'>Senha</label>
                        <input style={textInputStyle}
                            id='password'
                            type='password'
                            {...register('password', {
                                required: { value: true, message: 'Senha obrigatória' },
                                minLength: { value: 6, message: 'Senha deve ter no mínimo 6 caracteres' }
                            })}
                            placeholder='Sua senha'
                        />
                        {errors.password && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.password.message as string}</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <label htmlFor='confirmPassword'>Confirme sua senha</label>
                        <input style={textInputStyle}
                            id='confirmPassword'
                            type='password'
                            {...register('confirmPassword', {
                                required: { value: true, message: 'Confirmação de senha obrigatória' },
                                minLength: { value: 6, message: 'Senha deve ter no mínimo 6 caracteres' },
                                validate: (value, { password }) => value === password || 'Senhas não conferem'
                            })}
                            placeholder='Confirme sua senha'
                        />
                        {errors.confirmPassword && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.confirmPassword.message as string}</span>}
                    </div>
                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length}
                        disabled={(!watch('email') || !watch('password') || !watch('confirmPassword'))
                            || ((errors.email ? true : false) || (errors.password ? true : false) || errors.confirmPassword ? true : false)}
                        onClickNext={() => setFormStep(formStep + 1)}
                    />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: designTokens.spacing.tiny,
                    }}>
                        Ou faça parte com

                        <GoogleLogin
                            type='icon'
                            text='signin'
                            onSuccess={response => {
                                if (response.credential) {
                                    const userInfo = jwtDecode(response.credential) as GoogleResponse
                                    const { email, name, sub } = userInfo
                                    onGoogleSubmit({
                                        email,
                                        name,
                                        googleId: sub
                                    })
                                }
                            }}
                            shape='circle'
                            onError={() => console.error('Erro ao logar com Google')}
                        />
                    </div>
                </section>
            )}
            {formStep >= 1 && (
                <section style={{
                    display: formStep === 1 ? 'flex' : 'none',
                    width: '100%',
                    flexDirection: 'column',
                    gap: designTokens.spacing.medium
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.extraLarge,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 0,
                    }}>
                        Dados Pessoais
                    </h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <label htmlFor='name'>Nome</label>
                        <input style={textInputStyle}
                            id='name'
                            type='text'
                            {...register('name', {
                                required: { value: true, message: 'Nome obrigatório' },
                                minLength: { value: 3, message: 'Nome deve ter no mínimo 3 caracteres' },
                                validate: (value) => isAlpha(value.replace(/\s/g, ''), 'pt-BR') || 'Nome deve conter apenas letras'
                            })}
                            placeholder='Seu nome'
                        />
                        {errors.name && watch('name') && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.name.message as string}</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <label>Selecione seu gênero:</label>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: designTokens.spacing.medium
                            }}>
                                <RadioInput
                                    type='radio'
                                    value='masculino'
                                    {...register('gender', { required: true })}
                                />
                                <label htmlFor='masculino'>Masculino</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: designTokens.spacing.medium
                            }}>
                                <RadioInput
                                    type='radio'
                                    value='feminino'
                                    {...register('gender', { required: true })}
                                />
                                <label htmlFor='feminino'>Feminino</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: designTokens.spacing.medium
                            }}>
                                <RadioInput
                                    type='radio'
                                    value='não especificado'
                                    {...register('gender', { required: true })}
                                />
                                <label htmlFor='not-specified'>Prefiro não dizer</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: designTokens.spacing.medium
                            }}>
                                <RadioInput
                                    type='radio'
                                    value='outro'
                                    {...register('gender', { required: true })}
                                />
                                <label htmlFor='outro'>Outro</label>
                            </div>
                        </div>
                        {errors.gender && watch('gender') && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>Selecione uma opção</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <label htmlFor='birthDate'>Data de nascimento</label>
                        <input style={smallTextInputStyle}
                            id='birthDate'
                            type='date'
                            {...register('birthDate', {
                                required: { value: true, message: 'Data de nascimento obrigatória' },
                                validate: (value) => isBefore(value, new Date().toDateString()) || 'Data de nascimento inválida'
                            })}
                        />
                        {errors.birthDate && watch('birthDate') && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.birthDate.message as string}</span>}
                    </div>

                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length - 1}
                        disabled={(!watch('name') || !watch('birthDate')) || !watch('gender')
                            || !(!errors.name && !errors.gender && !errors.birthDate)}
                        onClickBack={() => setFormStep(formStep - 1)}
                        onClickSubmit={() => onSubmit({
                            email: watch('email'),
                            password: watch('password'),
                            name: watch('name'),
                            gender: watch('gender'),
                            birthDate: watch('birthDate'),
                        } as RegisterUser)}
                    />
                </section>
            )}
            {formStep >= 2 && (
                <section style={{
                    display: formStep === 2 ? 'flex' : 'none',
                    width: '100%',
                    flexDirection: 'column',
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.extraLarge,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 0,
                    }}>
                        Concluído
                    </h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: designTokens.spacing.medium,
                        width: '100%'
                    }}>
                        <span>Seu cadastro foi realizado com sucesso!</span>
                        <img
                            src={completeRegister}
                            alt='cadastro completo'
                            style={{
                                width: '100%',
                            }}
                        />
                    </div>

                </section>
            )}
            {formStep != steps.length - 1 && <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                color: designTokens.color.text,
                fontSize: designTokens.font.size.medium,
                marginTop: formStep === 0
                    ? designTokens.spacing.tiny
                    : designTokens.spacing.mediumLarge,
            }}>
                Possui cadastro? Retome sua segurança!
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
                    onClick={() => { navigate('/login') }}
                > Login </a>
            </div>}
        </form>
    )
}
